const path = require('path');
const fs = require('fs/promises');
const esbuild = require('esbuild');

const sourceFileMapPlugin = {
  name: 'source-file-map-plugin',
  setup(build) {
    // intercept all .ts files
    build.onResolve({ filter: /\.ts$/ }, (args) => {
      return {
        path: path.resolve(args.resolveDir, args.path),
        namespace: 'source-map-ns',
      };
    });
    
    build.onLoad({ filter: /\.ts$/, namespace: 'source-map-ns' }, async (args) => {
      const thisFilePath = path.relative(__dirname, args.path);

      // set SOURCE_FILE_MAP in content
      const contents = await fs.readFile(args.path, 'utf8');
      const transformedContent = contents.replace(
        /const SOURCE_FILE_MAP = null;/,
        `const SOURCE_FILE_MAP = "${thisFilePath}";`
      );

      return {
        contents: transformedContent,
        loader: 'ts',
        resolveDir: path.dirname(args.path),
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
  plugins: [sourceFileMapPlugin],
}).catch(() => process.exit(1)); 