import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), entries: [], ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  addPatient,
  getPatients,
  getPatientById,
  getNonSensitivePatients,
};
