import express, { Response } from 'express';

import { Diagnosis } from '../types';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getEntries());
});

export default router;
