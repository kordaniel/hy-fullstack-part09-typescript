import {
  DiaryEntry,
  DiaryEntryTypesUnion,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather
} from './types';

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const isWeather = (param: string): param is Weather => {
 return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseId = (id: unknown): number => {
  if(!isNumber(id)) {
    throw new Error('Server responded with incorrect id:' + id);
  }
  return id;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Server responded with incorrect date: ' + date);
  }
  return date;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Server responded with incorrect comment: ' + comment);
  }
  return comment;
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Server responded with incorrect weather: ' + weather);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Server responded with incorrect visibility: ' + visibility);
  }
  return visibility;
};

const toNonSensitiveDiaryEntry = (object: object): NonSensitiveDiaryEntry => {
  if (!('id' in object && 'date' in object && 'weather' in object && 'visibility' in object)) {
    throw new Error('Server responded with incorrect data: some fields are missing');
  }
  return {
    'id': parseId(object.id),
    'date': parseDate(object.date),
    'weather': parseWeather(object.weather),
    'visibility': parseVisibility(object.visibility),
  };
};

export const toNewDiaryTypesEntryTypesUnion = (object: unknown): DiaryEntryTypesUnion => {
  if (!object || typeof object !== 'object') {
    throw new Error('Server responded with incorrect or missing data');
  }

  const nonSensitiveDiaryEntry = toNonSensitiveDiaryEntry(object);

  if ('comment' in object) {
    const diaryEntry: DiaryEntry = {
      ...nonSensitiveDiaryEntry,
     comment: parseComment(object.comment),
    };
    return diaryEntry;
  }

  return nonSensitiveDiaryEntry;
};
