const fs = require('fs');
module.exports = {
  init (expressApp) {
    const serverHttps = require('https').createServer({
      // passphrase: 'Arson37Availed88Resolve'
    }, expressApp);
    const isDirectory = source => !fs.lstatSync('./certificates/' + source).isFile();
    const certFolders = fs.readdirSync('./certificates')
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
