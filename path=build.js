const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs/promises');

// Simplified esbuild plugin to fill SOURCE_FILE_MAP with filenames only
const sourceFileMapPlugin = {
  name: 'source-file-map-plugin',
  setup(build) {
    // Intercept relevant .ts files (e.g., Example.ts)
    build.onResolve({ filter: /Example\.ts$/ }, (args) => ({
      path: args.path,
      namespace: 'source-map-ns',
    }));

    build.onLoad({ filter: /.*/, namespace: 'source-map-ns' }, async (args) => {
      const contents = await fs.readFile(args.path, 'utf8');

      // Define the filenames to inject (customize this list)
      const filenames = {
        example: path.relative(__dirname, 'src/tools/Example.ts'),  // e.g., 'src/tools/Example.ts'
        auth: path.relative(__dirname, 'src/utils/Auth.ts'),        // e.g., 'src/utils/Auth.ts'
        // Add more files as needed, or dynamically scan (e.g., using fs.readdirSync)
      };

      // Inject the filled map into the code (replace the placeholder)
      const transformed = contents.replace(
        /const SOURCE_FILE_MAP = {};/,
        `const SOURCE_FILE_MAP = ${JSON.stringify(filenames, null, 2)};`
      );

      return {
        contents: transformed,
        loader: 'ts',  // Treat as TypeScript
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