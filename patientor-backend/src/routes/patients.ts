/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from 'express';

import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name, dateOfBirth, ssn, gender, occupation
  });
  res.json(addedPatient);
});

export default router;
