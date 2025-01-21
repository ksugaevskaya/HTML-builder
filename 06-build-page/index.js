const fs = require('fs/promises');
const path = require('path');

const pathToProjectDist = path.join(__dirname, 'project-dist');

const copyDir = async (pathToFileFolder, pathToCopyFolder) => {
  await fs.rm(pathToCopyFolder, { recursive: true, force: true });
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
    if (currentFile.isDirectory()) {
      await copyDir(
        path.join(pathToFileFolder, currentFile.name),
        path.join(pathToCopyFolder, currentFile.name),
      );
    }
  }
};

const projectDist = async () => {
  await fs.mkdir(pathToProjectDist, {
    recursive: true,
  });

  const pathToStyles = path.join(__dirname, 'styles');
  const files = await fs.readdir(pathToStyles, { withFileTypes: true });
  const allStyleFiles = [];
  for (let i = 0; i < files.length; i++) {
    const allFiles = files[i];

    if (path.extname(allFiles.name) === '.css') {
      const pathToStylesFiles = path.join(pathToStyles, allFiles.name);
      const fileContent = await fs.readFile(pathToStylesFiles);
      allStyleFiles.push(fileContent);
    }
  }

  const pathToPDStyles = path.join(__dirname, 'project-dist', 'style.css');
  await fs.writeFile(pathToPDStyles, allStyleFiles.join('\n'));

  const pathToTemplate = path.join(__dirname, 'template.html');
  let contentTemplate = await fs.readFile(pathToTemplate, {
    encoding: 'utf8',
  });

  const pathToComponentsFolder = path.join(__dirname, 'components');
  const componentsFolderFiles = await fs.readdir(pathToComponentsFolder, {
    withFileTypes: true,
  });
  for (let i = 0; i < componentsFolderFiles.length; i++) {
    const currentFile = componentsFolderFiles[i];

    const currentFileContent = await fs.readFile(
      path.join(pathToComponentsFolder, currentFile.name),
    );
    const extension = path.extname(currentFile.name);
    const currentFileName = path.basename(currentFile.name, extension);

    contentTemplate = contentTemplate.replace(
      `{{${currentFileName}}}`,
      currentFileContent,
    );
  }

  const pathToIndexHTML = path.join(__dirname, 'project-dist', 'index.html');
  await fs.writeFile(pathToIndexHTML, contentTemplate);

  const pathToAssets = path.join(__dirname, 'assets');
  const pathToPDAssets = path.join(__dirname, 'project-dist', 'assets');
  await copyDir(pathToAssets, pathToPDAssets);
};

projectDist();
