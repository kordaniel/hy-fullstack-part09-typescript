import axios from 'axios';

import { toNewDiaryTypesEntryTypesUnion } from '../utils';
import { DiaryEntry, DiaryEntryTypesUnion, NewDiaryEntryFormData } from '../types';

const baseUrl = 'api/diaries';

export const getAllDiaryEntries = (includeComments: boolean) => {
  return axios
    .get<unknown>(`${baseUrl}?includeComments=${includeComments ? 'true' : 'false'}`)
    .then(res => {
      if (!Array.isArray(res.data)) {
        return []; // Do not render error message in the UI
        // for the user, if server responds with a status 200 but returns malformed data.
      }
      return res.data.reduce((acc: DiaryEntryTypesUnion[], obj: unknown) => {
        try {
          acc.push(toNewDiaryTypesEntryTypesUnion(obj));
        } catch (error: unknown) {
          let errorMsg = 'Error querying diary entries';
          if (error instanceof Error) {
            errorMsg += `: ${error.message}`;
          }
          console.error(errorMsg); // Do not render error message in the UI
          // for the user, if server responds with a status 200 but returns malformed data.
        }
        return acc;
      }, []);
    });
};

export const createNewDiaryEntry = (object: NewDiaryEntryFormData) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(res => res.data);
};
