import {pino} from 'pino';

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'pid,hostname'
        }
    },
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});
