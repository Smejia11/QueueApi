import cron, { ScheduleOptions } from 'node-cron';
import logger from '../logger';

export class CronJob {
  private cronJob: cron.ScheduledTask | null = null;
  private scheduleOptions: ScheduleOptions;

  constructor(
    private callback: () => void,
    private cronExpression: string,
    scheduleOptions: ScheduleOptions
  ) {
    if (typeof callback !== 'function') {
      throw new Error('El callback debe ser una función.');
    }

    if (typeof cronExpression !== 'string') {
      throw new Error('La expresión Cron debe ser una cadena.');
    }
    this.scheduleOptions = scheduleOptions;
  }

  start(): void {
    this.stop();
    this.cronJob = cron.schedule(
      this.cronExpression,
      () => {
        try {
          this.callback();
        } catch (error) {
          if (error instanceof Error) logger.error(error.message);
        }
      },
      this.scheduleOptions
    );

    this.cronJob.start();
  }

  stop(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob = null;
    }
  }
}
