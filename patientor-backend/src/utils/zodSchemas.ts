import { z } from 'zod';

import { Gender, HealthCheckRating, Patient, NewEntry, } from '../types';

// https://en.wikipedia.org/wiki/National_identification_number#Finland
// NOTE: For simplicity, this regex accepts string's that have the
//       the correct format for finnish social security numbers, but
//       does not assert that the individual number, century sign or
//       the control character (last 5 characters) part is correct.
//       It doesnt even assert that the date is a correct date.
const finnishSsnRegex = /^\d{6}[+\-YXWVUABCDEF]\d{3}[0-9A-FHJ-NPR-Y]?$/;

export const newPatientSchema: z.ZodType<Omit<Patient, 'id' | 'entries'>> = z.object({
  name: z.string().min(3, 'Must be at least 3 characters long'),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(finnishSsnRegex, 'Invalid format for finnish SSN'),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(3, 'Must be at least 3 characters long'),
});

//const BaseNewEntrySchema: z.ZodType<Omit<BaseEntry, 'id'>> = z.object({
// typing the BaseNewEntrySchema prevents us from extending it, results with error
// => "Property 'extend' does not exist on type 'ZodType<Omit<BaseEntry, "id">, ZodTypeDef, Omit<BaseEntry, "id">>'.ts(2339)"
const baseNewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckNewEntrySchema = baseNewEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const occupationalHealthcareNewEntrySchema = baseNewEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional(),
});

const hospitalNewEntrySchema = baseNewEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const newEntrySchema: z.ZodType<NewEntry> = z.discriminatedUnion('type', [
  healthCheckNewEntrySchema,
  occupationalHealthcareNewEntrySchema,
  hospitalNewEntrySchema,
]);
