const path = require('node:path');
const process = require('node:process');

module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const srcDir = path.resolve(process.cwd(), 'src');

  root.find(j.ImportDeclaration).forEach((pathNode) => {
    const importPath = pathNode.value.source.value;

    if (importPath.startsWith('.')) {
      const absoluteImportPath = path.resolve(
        path.dirname(fileInfo.path),
        importPath
      );

      const relativePathFromSrc = path.relative(srcDir, absoluteImportPath);

      if (
        !relativePathFromSrc.startsWith('..') &&
        !path.isAbsolute(relativePathFromSrc)
      ) {
        const normalizedRelativePath = relativePathFromSrc.replace(/\\/g, '/');
        const newImportPath = `@/${normalizedRelativePath}`;
        pathNode.value.source.value = newImportPath;
      }
    }
  });

  return root.toSource();
};
