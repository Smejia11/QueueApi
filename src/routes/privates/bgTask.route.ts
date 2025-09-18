import express from 'express';
import { validateAndEscapeTask, validatorHandler } from '../../middlewares';
import { paramsSchema } from '../../validations';
import { RequestBgtTask } from '../../controllers/bgTask.controller';

const router = express.Router();

router.post('/', validateAndEscapeTask, RequestBgtTask.create);
router.get(
  '/:id/:queue/:taskName',
  validatorHandler(paramsSchema, 'params'),
  RequestBgtTask.get,
);
router.get(
  '/excel/:id/:queue/:taskName',
  validatorHandler(paramsSchema, 'params'),
  RequestBgtTask.getExcel,
);

export default router;
