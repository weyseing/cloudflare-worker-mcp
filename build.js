const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');

// Esbuild plugin to inject the current file's name/path into SOURCE_FILE_MAP in each .ts file
const sourceFileMapPlugin = {
  name: 'source-file-map-plugin',
  setup(build) {
    // Intercept all .ts files
    build.onResolve({ filter: /\.ts$/ }, (args) => {
      // Resolve to absolute path to avoid ENOENT
      const absolutePath = path.resolve(args.resolveDir, args.path);
      return {
        path: absolutePath,
        namespace: 'source-map-ns',
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'source-map-ns' }, async (args) => {
      const contents = await fs.readFile(args.path, 'utf8');

      // Get the relative path of this file (e.g., 'src/tools/Example.ts')
      const thisFilePath = path.relative(__dirname, args.path);

      // Create a simple map with this file's path
      const fileMap = {
        thisFile: thisFilePath,
      };

      // Inject the map into the code (replace the placeholder if it exists)
      const transformed = contents.replace(
        /const SOURCE_FILE_MAP = {};/,
        `const SOURCE_FILE_MAP = ${JSON.stringify(fileMap, null, 2)};`
      );

      return {
        contents: transformed,
        loader: 'ts',  // Treat as TypeScript
        resolveDir: path.dirname(args.path),  // Preserve the original directory for relative imports
      };
    });
  },
};

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/index.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, 'dist/worker.js'), 
  platform: 'browser',
  target: 'es2021', 
  sourcemap: true, 
  minify: false, 
  external: ['cloudflare:workers', 'async_hooks'],
  format: 'esm',
  plugins: [sourceFileMapPlugin],  // Add the plugin
}).catch(() => process.exit(1)); 