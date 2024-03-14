const {createWriteStream, existsSync, mkdirSync} = require('fs');
const dirName = 'Logs';

const generateFileName = () => {
    return 'Logs/log-' + new Date(Date.now()).toISOString().split('T')[0] + '.txt';
}

// create log file
const logFile = createWriteStream(generateFileName(), {flags: 'a+'});

if (!existsSync(dirName)) {
    mkdirSync(dirName);
}

// add log to file and console
const addLog = (message) => {
    console.log(message);
    logFile.write(
        `${message} ${new Date(Date.now()).toISOString()}\n`
    );
}


module.exports = {addLog};