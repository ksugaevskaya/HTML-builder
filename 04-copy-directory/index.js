const fs = require('fs/promises');
const path = require('path');

const pathToCopyFolder = path.join(__dirname, 'files-copy');
const pathToFileFolder = path.join(__dirname, 'files');

const copyDir = async () => {
  await fs.mkdir(pathToCopyFolder, { recursive: true });
  const allFilesFolder = await fs.readdir(pathToFileFolder, {
    withFileTypes: true,
  });

  for (let i = 0; i < allFilesFolder.length; i++) {
    const currentFile = allFilesFolder[i];

    if (currentFile.isFile()) {
      await fs.copyFile(
        path.join(pathToFileFolder, currentFile.name),
        path.join(pathToCopyFolder, currentFile.name),
      );
    }
  }
};
copyDir();
