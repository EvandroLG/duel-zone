module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const path = require('path');

  const srcDir = path.resolve(process.cwd(), 'src');

  root.find(j.ImportDeclaration).forEach((pathNode) => {
    const importPath = pathNode.value.source.value;
    if (importPath.startsWith('.')) {
      const absoluteImportPath = path.resolve(
        path.dirname(fileInfo.path),
        importPath
      );

      if (absoluteImportPath.startsWith(srcDir)) {
        const relativePathFromSrc = path
          .relative(srcDir, absoluteImportPath)
          .replace(/\\/g, '/');
        const newImportPath = `@/${relativePathFromSrc}`;
        pathNode.value.source.value = newImportPath;
      }
    }
  });

  return root.toSource();
};
