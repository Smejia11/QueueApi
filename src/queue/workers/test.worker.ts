import { Job } from 'bullmq';
import { sleep } from '../../utils';

const workerTest = async (job: Job) => {
  try {
    await job.updateProgress(1);
    await sleep(20000);
    await job.updateProgress(100);
    return { error: false, result: 'completado' };
  } catch (error: unknown) {
    throw new Error('failed process worker ', { cause: error });
  }
};

export default workerTest;
