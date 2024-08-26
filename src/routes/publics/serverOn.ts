import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get(
  '/',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      return res.send('Server On');
    } catch (err) {
      next(err);
    }
  }
);

export default router;
