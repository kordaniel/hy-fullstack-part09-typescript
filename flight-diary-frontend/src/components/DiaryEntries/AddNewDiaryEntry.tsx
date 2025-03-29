import React, { useState } from 'react';

import { createNewDiaryEntry } from '../../services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../../types';

interface AddNewDiaryEntryProps {
  addNewDiaryEntryCb: (newDiaryEntry: DiaryEntry) => void;
};

const AddNewDiaryEntry = ({ addNewDiaryEntryCb }: AddNewDiaryEntryProps) => {
  // Ex. 9.18 (You may skip all validations)
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
      date: '',
      weather: '' as Weather,
      visibility: '' as Visibility,
      comment: '',
  });

  const handleSubmitNewDiaryEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNewDiaryEntry(newDiaryEntry)
      .then(createdDiaryEntry => {
        //console.log('handleSubmit, response:', createdDiaryEntry);
        addNewDiaryEntryCb(createdDiaryEntry);
      })
      .catch((error: unknown) => {
        let errorMsg = 'Error creating DE';
        if (error instanceof Error) {
          errorMsg += `: ${error.message}`;
        }
        console.error(errorMsg);
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
