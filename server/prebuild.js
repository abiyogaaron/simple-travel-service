const fs = require("fs");
const env = process.env.NODE_ENV || 'development';
const source = './.swcrc';

/**
 * SWC compiler don't have capabilities to load different env config file
 * so we need to do this hacky way so we could load different swc config depends
 * on the environment
 */
fs.readFile(source, 'utf-8', (err, files) => {
  if (err) {
    console.error("Read file err: ", err);
    return err;
  }

  console.log("(SERVER) ENV: ", env);
  if (env === 'development') {
    return;
  }

  const swcrcConfig = JSON.parse(files);
  swcrcConfig.minify = true;
  swcrcConfig.jsc.minify = {
    compress: {
      unused: true
    },
    mangle: true
  }
  
  const json = JSON.stringify(swcrcConfig, null, 2);
  fs.writeFile('./.swcrcNonDev', json, 'utf-8', (err) => {
    if (err) {
      console.error("Write file err: ",err)
    }
  });
});