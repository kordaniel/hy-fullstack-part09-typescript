import express, { Response, Request } from 'express';

import middleware from '../utils/middleware';
import requestParsers from '../utils/requestParsers';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post(
  '/',
  requestParsers.newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient>
  ) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(middleware.errorMiddleware);

export default router;
