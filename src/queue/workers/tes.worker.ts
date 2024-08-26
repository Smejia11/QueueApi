import { Job } from 'bullmq';
import { sleep } from '../../utils';

const workerTest = async (job: Job) => {
  try {
    await sleep(20000);
    return { error: false, result: 'completado' };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default workerTest;
