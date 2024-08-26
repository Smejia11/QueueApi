import { Queue, JobJson, JobsOptions } from 'bullmq';
import { StatesBgtask } from '../enum';
import { connection } from './config';
import { iRespBgTas } from '../interfaces';
class BgTasks {
  private queue: Queue;
  private queueName: string;
  private taskName: string;

  constructor(queue: string) {
    this.queue = new Queue(queue, { connection });
    this.queueName = queue;
    this.taskName = '';
  }

  private generateResponse(job: JobJson | undefined): iRespBgTas {
    let state = StatesBgtask.STARTED;
    const { ip, token, device, ...restData }: any = job?.data
      ? JSON.parse(job.data)
      : {};

    const data = job?.returnvalue ? JSON.parse(job?.returnvalue) : null;

    if (!job || job?.failedReason) {
      state = StatesBgtask.ERROR;
    } else if (job.finishedOn && job.returnvalue) {
      state = StatesBgtask.COMPLETED;
    } else if (job.processedOn) {
      state = StatesBgtask.PROCESSED;
    }

    return {
      id: job?.id,
      payload: restData,
      error: job?.failedReason,
      progress: job?.progress,
      queue: this.queueName,
      taskName: this.taskName,
      state,
      data,
    };
  }

  async add(taskName: string, data: any, opts?: JobsOptions | undefined) {
    this.taskName = taskName;
    const queueAdd = await this.queue.add(taskName, data, opts);
    const response = this.generateResponse(queueAdd.asJSON());

    return response;
  }

  async get(id: string, taskName: string) {
    this.taskName = taskName;
    const getJob = await this.queue.getJob(id);
    const response = this.generateResponse(getJob?.asJSON());

    return response;
  }

  async getAll() {
    return await this.queue.getJobs();
  }

  async getAllPagination(jobStatus = [], page = 1, size = 5, isAsc = false) {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size - 1;
    return await this.queue.getJobs(jobStatus, startIndex, endIndex, isAsc);
  }

  async remove(id: string) {
    await this.queue.remove(id);
  }

  async removeAll(limit: number = 50) {
    await this.queue.clean(500, limit);
  }

  async obliterate() {
    await this.queue.obliterate();
  }
}

export default BgTasks;
