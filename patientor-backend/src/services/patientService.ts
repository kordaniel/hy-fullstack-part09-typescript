import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
import { toNewEntry, toNewPatient } from '../utils/parsersTypeGuards';

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = toNewPatient(patient);
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

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = getPatientById(patientId);
  if (patient) {
    const newEntry = toNewEntry(entry);
    patient.entries.push(toNewEntry(newEntry));
    return newEntry;
  }

  return undefined;
};

export default {
  addPatient,
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  addEntry,
};
