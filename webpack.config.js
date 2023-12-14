var path = require('path');
var webpack = require('webpack');
require('dotenv').config();

module.exports = async (env) => {
    console.log("########### GAMS-JS-BUNDLING ############","\n#");
    let deployPath = "dist";

    if(process.env.DIST_PATH){
        console.log(`# GAMJS: process.env.DIST_PATH set to ${process.env.DIST_PATH}. Distributing now to specified location ...\n#`);
        deployPath = process.env.DIST_PATH;
    } else {
        console.log("# GAMJS: process.env.DIST_PATH not set. Deploying to ./dist...");    
        console.log("# GAMJS: You may create an '.env' file to specify the path to where gams.js should be bundled to ... ");
        console.log("# GAMJS: ...via setting GAMSDEV_PATH inside the .env - file ", "\n");
    };

    if(process.env.SOURCE_MAP === 'true'){
        console.log(`# GAMJS: process.env.SOURCE_MAP set to ${process.env.SOURCE_MAP}. Generating now source map to gamsJs  ...`);
        console.log(`# GAMJS: Don't forget to REMOVE SOURCE MAP when deploying to GAMS! ...\n\n`);
    } else {
        console.log(`# GAMJS: process.env.SOURCE_MAP set to ${process.env.SOURCE_MAP}. No source map will be applied. If set to true (in the .env file) a source-map will be added to the file (with drastically increased bundle files.)  ...\n\n`);
    }


    return {
        // Change to your "entry-point".
        entry: './src/index.ts',
        devtool: process.env.SOURCE_MAP === 'true' ? 'source-map' : undefined,
        output: {
            path: path.resolve(__dirname, deployPath),
            filename: 'gams.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        module: {
            rules: [{
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }],
        }
    }
};