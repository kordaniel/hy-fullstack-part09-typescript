import React, { useState } from 'react';
import { isAxiosError } from 'axios';

import { createNewDiaryEntry } from '../../services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../../types';
import { isDefinedNonEmptyString } from '../../utils';

import ErrorRenderer from '../ErrorRenderer';

interface AddNewDiaryEntryProps {
  addNewDiaryEntryCb: (newDiaryEntry: DiaryEntry) => void;
};

const AddNewDiaryEntry = ({ addNewDiaryEntryCb }: AddNewDiaryEntryProps) => {
  // Ex. 9.18 & 9.19 (You may skip all clientside validations)
  const initialDiaryEntry: NewDiaryEntry = {
    date: '',
    weather: '' as Weather,
    visibility: '' as Visibility,
    comment: '',
  };
  const [error, setError] = useState<string>('');
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>(initialDiaryEntry);

  const handleSubmitNewDiaryEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNewDiaryEntry(newDiaryEntry)
      .then(createdDiaryEntry => {
        addNewDiaryEntryCb(createdDiaryEntry);
        setError('');
        setNewDiaryEntry(initialDiaryEntry);
      })
      .catch((error: unknown) => {
        const errorMsg = 'Something went wrong. Error: ';
        if (isAxiosError(error)) {
          if (isDefinedNonEmptyString(error.response?.data)) {
            setError(error.response.data); // validation failure, all status 4xx?
          } else if (isDefinedNonEmptyString(error.response?.statusText)) {
            setError(`${errorMsg}${error.response.statusText}`); // no response from server, all status 5xx?
          } else {
            setError(`${errorMsg}${error.message}`);
          }
        } else if (error instanceof Error) {
          setError(`${errorMsg}${error.message}`);
        } else {
          console.error(errorMsg);
        }
      });
  };

  const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      date: e.target.value,
    });
  };
  const handleInputVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      visibility: e.target.value as Visibility,
    });
  };
  const handleInputWeather = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      weather: e.target.value as Weather,
    });
  };
  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      comment: e.target.value,
    });
  };

  return (
    <div style={{ border: "solid", padding: "0.25em" }}>
      <h2>Add new entry</h2>
      <ErrorRenderer errorMsg={error} />
      <form onSubmit={handleSubmitNewDiaryEntry}>
        <table>
          <tbody>
            <tr>
              <td>date:</td>
              <td><input value={newDiaryEntry.date} onChange={handleInputDate} type="text" /></td>
            </tr>
            <tr>
              <td>visibility:</td>
              <td><input value={newDiaryEntry.visibility} onChange={handleInputVisibility} type="text" /></td>
            </tr>
            <tr>
              <td>weather:</td>
              <td><input value={newDiaryEntry.weather} onChange={handleInputWeather} type="text" /></td>
            </tr>
            <tr>
              <td>comments:</td>
              <td><input value={newDiaryEntry.comment} onChange={handleInputComment} type="text" /></td>
            </tr>
            <tr>
              <td style={{ textAlign: 'right' }} colSpan={2}><button type="submit">Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddNewDiaryEntry;
