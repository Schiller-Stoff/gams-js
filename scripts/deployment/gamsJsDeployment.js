
var fs = require("fs");

/**
 * Loops through set directory css and js files -> saves them into object map
 * of filenames.
 * @returns {Promise<{[property: string]: string[]}>} Map of widgets and there js and css dependencies.
 */
const loopDirectories = () => {
  console.log("# Looking now at gamsdev/stoffse/test for the widget files to be injected...  ");
  console.log("# Writing environment variable GAMJS_INJECTMAP into built gams.js file for handling widget injection.");
  // base setup.
  const glossaBase = "X:/gamsdev/test/";
  const widgetDirectories = {
    "TripleForm": `${glossaBase}TripleForm/`,
    "GdasMApp": `${glossaBase}GdasMApp/`,
    "ZimCalendar":`${glossaBase}ZimCalendar/`
  }
  let widgetInjectionMap = {
    "TripleForm": {
      files: undefined,
      containerId: "GAMS_WIDGET_TRIPLEFORM"
    },
    "GdasMApp": {
      files: undefined,
      containerId: "GAMS_WIDGET_GDASMAPP"
    },
    "ZimCalendar": {
      files :undefined,
      containerId: "GAMS_WIDGET_CALENDAR"
    }
  };

  //resolve if all files are read out
  return new Promise(async (resolve, reject) => {

    let i = 0;
    for(let key in widgetDirectories){
      let currentPath = `${widgetDirectories[key]}/js`;
      let files = await readDirPromised(currentPath); 
      widgetInjectionMap[key].files = files;
      
      let csscurrentPath = `${widgetDirectories[key]}/css`;
      readDirPromised(csscurrentPath).then((files) => {
        //spread css files to existing array of js filenames.
        widgetInjectionMap[key].files.push(...files);
        if(i === Object.keys(widgetDirectories).length)resolve(widgetInjectionMap);
      });
      i++;
    };

  })
} 

/**
 * Returns list of files in directory as Promise.
 * @returns {Promise<string[]>} String array of files names in given folder.
 */
const readDirPromised = (folder) => {
  return new Promise(function(resolve, reject) {
      fs.readdir(folder, (err, files) => {
          if (err) 
              reject(err); 
          else 
              resolve(files);
      });
  });
}



module.exports = {
  loopDirectories
}