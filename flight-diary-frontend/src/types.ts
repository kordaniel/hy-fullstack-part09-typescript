export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type DiaryEntryTypesUnion = DiaryEntry | NonSensitiveDiaryEntry;

type ConvertInterfaceEnumsToString<T> = {
  [K in keyof T]: T[K] extends string | number ? string : T[K];
};

export type NewDiaryEntryFormData = ConvertInterfaceEnumsToString<NewDiaryEntry>;

export type HTMLTagStylesObject = {
  [key: string]: React.CSSProperties;
};
