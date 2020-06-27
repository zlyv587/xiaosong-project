const path = require('path');
const { env } = require('../../app.config');
const {createLogger, transports, format} = require('winston');
const {combine, label, printf} = format;
const moment = require('moment');
require('winston-daily-rotate-file');


const myFormat = printf(info => `${moment().format('YYYY-MM-DD HH:mm Z')} [${info.level}] [${info.label}] - ${info.message}`);
const logger = createLogger({
    level: 'info',
    format: combine(
        label({label: 'cms'}),
        myFormat
    ),
    defaultMeta: {service: 'cms-service'},
    transports: [
        // new transports.Console(),
        new transports.DailyRotateFile({
            filename: path.resolve(__dirname, '../../logs/cms.error-%DATE%.log'),
            level: 'error',
            json: true,
            datePattern: 'YYYYMMDD'
        }),
        new transports.DailyRotateFile({
            filename: path.resolve(__dirname, '../../logs/cms-%DATE%.log'),
            json: true,
            datePattern: 'YYYYMMDD'
        })
    ]
});

if (env !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}
module.exports = {
    log: (message) => {
        logger.log({level: 'info', message: getLoggerParams(message),});
    },
    warn: (message) => {
        logger.log({level: 'warn', message: getLoggerParams(message),});
    },
    error: (message) => {
        logger.log({level: 'error', message: getLoggerParams(message),});
    }
};


function getLoggerParams(message) {
    // if (ctx) {
    //     return JSON.stringify({
    //         req: ctx.request,
    //         res: ctx.response,
    //         message,
    //     });
    // }
    // else {
    //     return message;
    // }
    return message;
}
