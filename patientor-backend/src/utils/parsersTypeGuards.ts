import { v1 as uuid } from 'uuid';
import { Entry, NewEntry, NewPatient, Patient } from '../types';

export const toNewPatient = (patient: NewPatient): Patient => {
  return {
    id: uuid(),
    entries: [],
    ...patient,
  };
};

export const toNewEntry = (entry: NewEntry): Entry => {
  return {
    id: uuid(),
    ...entry,
  };
};
