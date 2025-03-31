import { Entry, Patient } from '../types';
import { newPatientSchema } from './zodSchemas';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEntries = (_array: unknown[]): _array is Entry[] => {
  return true; // NOTE: interface Entry is currently empty, so no checking needed
};

const parseId = (id: unknown): string => {
  if(!isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
};

const parseEntries = (array: unknown): Entry[] => {
  if(!Array.isArray(array) || !isEntries(array) ) {
    throw new Error('Incorrect or missing entries');
  }
  return array;
};

export const toPatient = (obj: unknown): Patient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data for Patient');
  }

  const patient = newPatientSchema.parse(obj);
  if (!('id' in obj && 'entries' in obj)) {
    throw new Error('missing fields for Patient');
  }

  return {
    ...patient,
    id: parseId(obj.id),
    entries: parseEntries(obj.entries),
  };
};
