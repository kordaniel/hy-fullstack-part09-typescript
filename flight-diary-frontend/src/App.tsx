import React, { useEffect, useState } from 'react';

import { getAllDiaryEntries } from './services/diaryService';
import { DiaryEntry, DiaryEntryTypesUnion, NonSensitiveDiaryEntry } from './types';

import DiaryEntries from './components/DiaryEntries';
import ErrorRenderer from './components/ErrorRenderer';
import Selector from './components/DiaryEntries/Selector';
import AddNewDiaryEntry from './components/DiaryEntries/AddNewDiaryEntry';


const App = () => {
  const [includeComments, setIncludeComments] = useState<boolean>(false);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntryTypesUnion[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAllDiaryEntries(includeComments)
      .then(data => {
        setDiaryEntries(data);
        setError('');
      })
      .catch((err: unknown) => {
        let errorMsg = 'Error querying diary entries';
        if (err instanceof Error) {
          errorMsg += `: ${err.message}`;
        }
        setDiaryEntries([]);
        setError(errorMsg); // Render error message in the UI for the user if server returns status != 200
      });
  }, [includeComments]);

  const addNewDiaryEntry = (newDiaryEntry: DiaryEntry) => {
    //console.log('adding new diary to list!:', newDiaryEntry);
    if (includeComments) {
      setDiaryEntries(diaryEntries.concat(newDiaryEntry));
    } else {
      const nonSensitivDiaryEntry: NonSensitiveDiaryEntry = {
        id: newDiaryEntry.id,
        date: newDiaryEntry.date,
        weather: newDiaryEntry.weather,
        visibility: newDiaryEntry.visibility
      };
      setDiaryEntries(diaryEntries.concat(nonSensitivDiaryEntry));
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeComments(e.target.checked);
  };

  return (
    <div>
      <h1>HY FullstackOpen React with types</h1>
      <Selector
        includeComments={includeComments}
        handleCheckboxChange={handleCheckboxChange}
      />
      <ErrorRenderer errorMsg={error} />
      <AddNewDiaryEntry addNewDiaryEntryCb={addNewDiaryEntry} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
