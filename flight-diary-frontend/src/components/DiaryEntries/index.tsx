import { DiaryEntryTypesUnion } from '../../types';

interface DiaryEntriesProps {
  diaryEntries: DiaryEntryTypesUnion[];
};

const Entry = ({ entry }: { entry: DiaryEntryTypesUnion }) => {
  const hasComment = 'comment' in entry && entry.comment;
  return (
    <span>
      <h3>{entry.date}</h3>
      Visibility: {entry.visibility}<br />
      Weather: {entry.weather}<br />
      {hasComment && <>Comment: {entry.comment}</>}
    </span>
  );
};

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps) => (
  <div style={{ border: "solid" }}>
    <h2>Diary Entries</h2>
    <ul>
      {diaryEntries.length > 0
        ? diaryEntries.map(de => <li key={de.id}><Entry entry={de} /></li>)
        : <li><h3>No entries in diary</h3></li>
      }
    </ul>
  </div>
);

export default DiaryEntries;
