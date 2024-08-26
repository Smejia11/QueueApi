import express from 'express';
import { RequestBgtTask } from '../../services/index';

const router = express.Router();

router.post('/', RequestBgtTask.create);
router.get('/:id/:queue/:taskname', RequestBgtTask.get);
router.get('/excel/:id/:queue/:taskname', RequestBgtTask.getExcel);

export default router;
