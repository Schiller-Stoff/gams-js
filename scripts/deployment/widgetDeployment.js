
const fs = require("fs");

/**
 * Module to help bringing React-App etc. code to deployable
 * form for GAMS.
 */
const GamsWidgetDeployer = (() => {
  /**
   * Copies all relevant deployable css and js code from React App's
   * source path to target path.
   * - does not work remotely just provides local copy functionalities.
   * @param {string} targetPath
   */
  const copyDeploymentFiles = (targetPath) => {



  };

  /**
   * Analyses built React App files and restructures to deployable form on GAMS.
   * - only takes js and css files
   * - renames files according to required load order and given widgetName
   * - creates in working dir 'deploy' folder
   * @param {string} distPath
   * @param {string} deployPath
   */
  const distToDeployment = (widgetName) => {
    const CUR_WORK_DIR = process.cwd();
    const DIST_PATH = CUR_WORK_DIR + '/dist';
    const jsPath = `${DIST_PATH}/static/js`;
    const cssPath = `${DIST_PATH}/static/css`;

    //first check if deploy folder exists
    const DEPLOY_PATH = CUR_WORK_DIR + '/deploy';
    if (!fs.existsSync(DEPLOY_PATH)){
      fs.mkdirSync(DEPLOY_PATH);
    }

    return new Promise( async (resolve, reject) => {
      
      //first retrieve filenames.
      let fileNames = await readDirPromised(jsPath);
      fileNames.forEach((fileName, i) => {
        fs.copyFile(`${jsPath}/${fileName}`, `${DEPLOY_PATH}/js/${widgetName}_0${i}`, (err) => {
          if (err) reject(err);
        });
      });

      let cssFileNames = await readDirPromised(cssFileNames);
      fileNames.forEach((fileName, i) => {
        fs.copyFile(`${cssPath}/${fileName}`, `${DEPLOY_PATH}/css/${widgetName}_0${i}`, (err) => {
          if (err) reject(err);
        });
      });

      resolve();
    });
  };

  /**
   * Returns list of files in directory as Promise.
   * @returns {Promise<string[]>} String array of files names in given folder.
   */
  const readDirPromised = (folder) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folder, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  };


  return {
    copyDeploymentFiles,
    distToDeployment,
  };
})();

module.exports = { ...GamsWidgetDeployer };
