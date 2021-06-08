const fs = require('fs');
module.exports = {
  init (expressApp, folder) {
    if (folder === undefined) {
      folder = 'certificates';
    }
    const serverHttps = require('https').createServer({}, expressApp);
    const isDirectory = source => !fs.lstatSync(`./${folder}/${source}`).isFile();
    const certFolders = fs.readdirSync(`./${folder}`)
      .filter(isDirectory)
      //.map(d => d.name);
    console.log('certFolders', certFolders);
    if (certFolders.length === 0) {
      console.warn('no certificate found. You should generate at least one certificate into the "certificates" folder (cf README.md inside the "certificates" folder.');
    }
    for (let f of certFolders) {
      serverHttps.addContext(f, {
        key: fs.readFileSync(`./certificates/${f}/privkey.pem`),
        cert: fs.readFileSync(`./certificates/${f}/fullchain.pem`)
      });
    }
    return serverHttps;
  }
};
