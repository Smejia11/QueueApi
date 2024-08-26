import express from 'express';
const router = express.Router();

import welcome from '../publics/serverOn';

import { Routes } from '../../enum';
router.use(Routes.serverOn, welcome);

export default router;
