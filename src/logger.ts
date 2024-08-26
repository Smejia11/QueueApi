import pino from 'pino';

export default pino({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: 'pino/file',
        level: 'error',
        options: {
          destination: `${__dirname}/logs/app.log`,
          mkdir: true,
          minLength: 4096, // Buffer before writing
          sync: false,
          maxSize: 10485760, // 10 MB
        }, // Asynchronous logging},
      },
      {
        target: 'pino-pretty',
      },
    ],
  },
});
