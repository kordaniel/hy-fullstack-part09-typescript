import express , { Response } from 'express';

import diaryService from '../services/diaryService';

import toNewDiaryEntry, { isString } from '../utils';
import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';

const router = express.Router();

const shouldIncludeComments = (query: { includeComments?: string }): boolean => {
  const { includeComments } = query;
  return typeof includeComments !== 'undefined'
    && isString(includeComments) // probably not needed.. TODO: Study express to be sure
    && includeComments === 'true';
};

router.get('/', (req, res: Response<NonSensitiveDiaryEntry[] | DiaryEntry[]>) => {
  if (shouldIncludeComments(req.query)) {
    res.send(diaryService.getEntries());
  } else {
    res.send(diaryService.getNonSensitiveEntries());
  }
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;