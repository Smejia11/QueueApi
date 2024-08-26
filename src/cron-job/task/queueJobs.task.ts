import BgTasks from '../../queue/queue';
import { queueNames } from '../../enum';

export class QueueJobs {
  constructor() {}

  async deleteJobs() {
    try {
      const queues: string[] = Object.values(queueNames);
      queues.forEach(async (queue) => {
        const task = new BgTasks(queue);
        await task.obliterate();
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
