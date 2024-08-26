import express from 'express';

import bgTask from './bgTask.route';

import { Routes } from '../../enum';

const router = express.Router();

router.use(Routes.bgTask, bgTask);

export default router;
