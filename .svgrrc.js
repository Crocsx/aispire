const path = require('path');

module.exports = {
  typescript: true,
  icon: '1.5rem',
  outDir: 'modules/shared/icons/src/lib/client/svg/__generated__',
  indexTemplate(filePaths) {
    return [
      `import loadable from '@loadable/component';`,
      ...filePaths.map(({ path: filePath }) => {
        const basename = path.basename(filePath, path.extname(filePath));
        const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
        return `export const ${exportName}Icon = loadable(() => import('./${basename}'));`;
      }),
    ].join('\n');
  },
};
