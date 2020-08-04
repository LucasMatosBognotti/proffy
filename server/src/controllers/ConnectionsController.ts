import { Request, Response, } from 'express';
import connection from '../database/connection';

class ConnectionsController {
  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    await connection('connections').insert({
      user_id
    });

    return res.status(201).json({
      message: 'connection successfully registered'
    });
  }

  async index(req: Request, res: Response) {
    const [ total ] = await connection('connections').count('* as total');
    
    return res.json(total);
  }
}

export default new ConnectionsController();
