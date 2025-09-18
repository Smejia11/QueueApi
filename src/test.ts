import test from 'node:test';
import assert from 'node:assert';
import BgTasks from './services/queue/queue';
import { StatesBgTask } from './enum';

const bgTasks = new BgTasks('test-queue');
let idGenerate = '';

test('BgTasks: add job', async () => {
  const data = { name: 'test' };
  const response = await bgTasks.add('myTask', data);

  assert.ok(response.id, 'Job must have an id');
  idGenerate = response.id;
  assert.deepStrictEqual(response.payload, data);
  assert.strictEqual(response.state, StatesBgTask.STARTED);
});

test('BgTasks: get job', async () => {
  const data = { name: 'test' };
  const response = await bgTasks.get(idGenerate as string, 'myTask');

  assert.ok(response.id, 'Job must have an id');
  assert.deepStrictEqual(response.payload, data);
  assert.strictEqual(response.state, StatesBgTask.STARTED);
});

test('BgTasks: remove job', async () => {
  const res = await bgTasks.remove(idGenerate);
  assert.strictEqual(res, 1);
});

test('BgTasks: obliterate queue', async () => {
  let called = false;

  bgTasks['queue'] = {
    obliterate: async () => {
      called = true;
    },
  } as any;

  await bgTasks.obliterate();
  assert.strictEqual(called, true);
});
