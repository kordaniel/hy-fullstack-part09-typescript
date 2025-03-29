import { useEffect, useState } from 'react';

import { getAllDiaryEntries } from './services/diaryService';
import { DiaryEntryTypesUnion } from './types';

import DiaryEntries from './components/DiaryEntries';
import ErrorRenderer from './components/ErrorRenderer';
import Selector from './components/DiaryEntries/Selector';


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
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
