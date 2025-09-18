import { Worker } from 'bullmq';
import { connection, concurrency } from '../config';
import workerTest from './test.worker';

new Worker('testQueue', workerTest, { connection, concurrency });
