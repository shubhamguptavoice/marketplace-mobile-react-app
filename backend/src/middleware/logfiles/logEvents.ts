const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

let logEvents = async (message:any, logName:any) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '../..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '../..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '../..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}
var datetime = new Date();
const logfiledate=datetime.toISOString().slice(0,10)
console.log(datetime.toISOString().slice(0,10));
const logger = (req:any, res:any, next:any) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, `${logfiledate}-userLog.txt`);
   // console.log(`${req.method} ${req.path}`);
    next();
}
//module.exports = { logger, logEvents };
export { logger, logEvents }