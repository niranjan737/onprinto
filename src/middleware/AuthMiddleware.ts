import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Exception } from 'tsoa';

export const SECRET_KEY: Secret = process.env.SECRET_KEY || '';

export interface CustomRequest extends Request {
    decoded: any;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).decoded = decoded;
    } catch(err) {
        throw new Error('Token is not valid');
    }
    next();
 } catch (err) {
   res.status(401).send({
        success: false,
        message: (err as Exception).message || 'Please authenticate'
    });
 }
};


let isAdmin= (req:CustomRequest, res: Response, next:NextFunction) =>{
  console.log('type', req?.decoded.type);
  if(req?.decoded.type === 'admin'){
      next();
  }else{
      res.status(401).send('Unauthorized access');
  }
};

module.exports = {
  auth: auth,
  isAdmin: isAdmin
}