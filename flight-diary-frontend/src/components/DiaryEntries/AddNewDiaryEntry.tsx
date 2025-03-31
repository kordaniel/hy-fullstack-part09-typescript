import React, { useRef, useState } from 'react';
import { isAxiosError } from 'axios';

import RadioSelection from './RadioSelection';

import { createNewDiaryEntry } from '../../services/diaryService';
import { DiaryEntry, HTMLTagStylesObject, NewDiaryEntryFormData, Visibility, Weather } from '../../types';
import { isDefinedNonEmptyString, isVisibility, isWeather } from '../../utils';

import ErrorRenderer from '../ErrorRenderer';

const styles: HTMLTagStylesObject = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid',
    padding: '0.25em',
  },
  formContainer: {
    width: 'fit-content',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const initialDiaryEntry: NewDiaryEntryFormData = {
  date: new Date().toJSON().slice(0, 10),
  weather: '',
  visibility: '',
  comment: '',
};

interface AddNewDiaryEntryProps {
  addNewDiaryEntryCb: (newDiaryEntry: DiaryEntry) => void;
};

const AddNewDiaryEntry = ({ addNewDiaryEntryCb }: AddNewDiaryEntryProps) => {
  const [error, setError] = useState<string>('');
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntryFormData>(initialDiaryEntry);

  const formRef = useRef<HTMLFormElement | null>(null);
  const visibilityOptions: string[] = Object.values(Visibility).map(v => v.toString());
  const weatherOptions: string[] = Object.values(Weather).map(w => w.toString());

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const validateForm = (): string[] => {
    return Object.entries(newDiaryEntry)
      .filter((([field, ]) => field !== 'comment')) // comment can be empty
      .reduce((acc: string[], [field, value]) => {
        if (!value) {
          acc.push(`${field} is required`);
        }
        return acc;
      }, []);
  };

  const handleSubmitNewDiaryEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors: string[] = validateForm();
    if (errors.length > 0) {
      setError(`Please fill in all required fields: ${errors.join(' | ')}`);
      return;
    }

    if (error) {
      setError('');
    }

    createNewDiaryEntry(newDiaryEntry)
      .then(createdDiaryEntry => {
        addNewDiaryEntryCb(createdDiaryEntry);
        setError('');
        clearForm();
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

  const updateWeather = (weather: string) => {
    if (!isWeather(weather)) {
      return;
    }
    setNewDiaryEntry({
      ...newDiaryEntry,
      weather
    });
  };

  const updateVisibility = (visibility: string) => {
    if (!isVisibility(visibility)) {
      return;
    }
    setNewDiaryEntry({
      ...newDiaryEntry,
      visibility
    });
  };

  const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      date: e.target.value,
    });
  };

  const updateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      comment: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <h2>Add new entry</h2>
      <ErrorRenderer errorMsg={error} />
      <div style={styles.formContainer}>
        <form ref={formRef} onSubmit={handleSubmitNewDiaryEntry}>
          <div style={styles.formGroup}>
            <fieldset>
              <legend>Visibility:</legend>
              <RadioSelection label="visibility" options={visibilityOptions} handleChange={updateVisibility} />
            </fieldset>
            <fieldset>
              <legend>Weather:</legend>
              <RadioSelection label="weather" options={weatherOptions} handleChange={updateWeather} />
            </fieldset>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              max={new Date().toJSON().slice(0,10)}
              value={newDiaryEntry.date}
              onChange={updateDate}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="comment">Comment:</label>
            <input type="text" id="comment" value={newDiaryEntry.comment} onChange={updateComment} />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewDiaryEntry;
