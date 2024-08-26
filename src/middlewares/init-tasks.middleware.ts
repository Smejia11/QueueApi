import { ScheduleOptions } from 'node-cron';
import config from '../config';
import logger from '../logger';
import { CronJob } from '../cron-job';
import { QueueJobs } from '../cron-job/task';

const {
  jobs: { deleteJobsTime },
} = config;

export function initTasks() {
  try {
    const queueJobs = new QueueJobs();

    const scheduleOptions: ScheduleOptions = {
      scheduled: true,
      timezone: 'America/Bogota',
    };
    [
      {
        callback: queueJobs.deleteJobs,
        cronExpression: deleteJobsTime,
        scheduleOptions: scheduleOptions,
      },
    ].map(({ callback, cronExpression, scheduleOptions }) =>
      new CronJob(callback, cronExpression, scheduleOptions).start()
    );
  } catch (error) {
    if (error instanceof Error) logger.fatal(error.message);
    else logger.fatal(error);
  }
}
