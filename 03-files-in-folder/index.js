const path = require('path');
const fs = require('fs/promises');

const filePath = path.join(__dirname, 'secret-folder');

const fileInfo = async () => {
  const allFiles = await fs.readdir(filePath, { withFileTypes: true });

  for (let i = 0; i < allFiles.length; i++) {
    const currentFile = allFiles[i];

    if (currentFile.isFile()) {
      const statistics = await fs.stat(path.join(filePath, currentFile.name));
      const extension = path.extname(currentFile.name);
      const name = path.basename(currentFile.name, extension);

      console.log(
        `${name} - ${extension.replace('.', '')} - ${statistics.size} bytes`,
      );
    }
  }
};
fileInfo();
