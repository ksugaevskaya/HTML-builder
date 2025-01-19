const fs = require('fs/promises');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');

const styleFilesRead = async () => {
  const styleFiles = await fs.readdir(pathToStyles, { withFileTypes: true });

  const result = [];

  for (let i = 0; i < styleFiles.length; i++) {
    const currentStyleFile = styleFiles[i];

    if (
      currentStyleFile.isFile() &&
      path.extname(currentStyleFile.name) === '.css'
    ) {
      const pathToFile = path.join(pathToStyles, currentStyleFile.name);
      const fileContent = await fs.readFile(pathToFile, { encoding: 'utf-8' });
      result.push(fileContent);
    }
  }

  const projectDistPath = path.join(__dirname, 'project-dist', 'bundle.css');
  await fs.writeFile(projectDistPath, result.join('\n'));
};

styleFilesRead();
