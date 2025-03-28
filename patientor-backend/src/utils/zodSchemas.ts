import { z } from 'zod';

import { Gender } from '../types';

// https://en.wikipedia.org/wiki/National_identification_number#Finland
// NOTE: For simplicity, this regex accepts string's that have the
//       the correct format for finnish social security numbers, but
//       does not assert that the individual number, century sign or
//       the control character (last 5 characters) part is correct.
//       It doesnt even assert that the date is a correct date.
const finnishSsnRegex = /^\d{6}[+\-YXWVUABCDEF]\d{3}[0-9A-FHJ-NPR-Y]?$/;

export const newPatientSchema = z.object({
  name: z.string().min(3, 'Must be at least 3 characters long'),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(finnishSsnRegex, 'Invalid format for finnish SSN'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(3, 'Must be at least 3 characters long'),
});
