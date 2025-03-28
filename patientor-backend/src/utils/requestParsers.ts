import { NextFunction, Response, Request } from 'express';

import { newPatientSchema } from './zodSchemas';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  newPatientParser,
};
