import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import xlsx from 'node-xlsx';
import { Stream } from 'stream';
import BgTasks from '../queue/queue';
import { StatesBgtask } from '../enum';

export class RequestBgtTask {
  static async getQueue(req: Request) {
    try {
      const { id, queue, taskname } = req.params;

      const bgTask = new BgTasks(queue);
      return await bgTask.get(id, taskname);
    } catch (error) {
      throw error;
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip || '127.0.0.0';
      const { queue, taskName, data } = req.body;
      const { authorization: token } = req.headers;

      if (typeof data !== 'object') {
        throw boom.badData('the data must be of object type');
      }

      const bgTask = new BgTasks(queue);
      const response = await bgTask.add(taskName, { ip, token, ...data });

      res.send(response);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RequestBgtTask.getQueue(req);

      res.send(response);
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  }

  static async getExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RequestBgtTask.getQueue(req);

      if (response.state !== StatesBgtask.COMPLETED) {
        return res.json(response);
      }

      const excelBuffer = xlsx.build([
        // @ts-ignore
        { name: 'Sheet 1', data: response.data.data },
      ]);
      // @ts-ignore
      const fileContents = Buffer.from(excelBuffer, 'base64');
      const readStream = new Stream.PassThrough();
      readStream.end(fileContents);
      res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );

      readStream.pipe(res);
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  }
}
