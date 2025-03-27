import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isFinnishSsn = (ssn: string): boolean => {
  // https://en.wikipedia.org/wiki/National_identification_number#Finland
  // NOTE: For simplicity, this regex accepts string's that have the
  //       the correct format for finnish social security numbers, but
  //       does not assert that the individual number, century sign or
  //       the control character (last 5 characters) part is correct.
  return /^\d{6}[+-YXWVUBCDEF]\d{3}[0-9A-FHJ-NPR-Y]?$/.test(ssn);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.length < 3) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isFinnishSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.length < 3) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (!(
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  )) {
    throw new Error('Incorrect data: some fields are missing');
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newPatient;
};

export default toNewPatient;
