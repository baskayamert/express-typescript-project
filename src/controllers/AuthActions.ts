import { Request, Response } from 'express';
import { authenticateUser } from '../auth/auth.service';

export function login(req: Request, res: Response) {
  const { username, password } = req.body;

  authenticateUser(username, password)
    .then((token) => {
      res.status(200);
      res.json({ token: token });
    })
    .catch((error) => {
      res.status(401).json({ message: error.message });
    });
}
