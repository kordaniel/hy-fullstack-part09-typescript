import Content from './Content';
import Header from './Header';
import Total from './Total';

import { CoursePart } from '../../App';

export interface CourseViewProps {
  courseName: string;
  courseParts: CoursePart[];
  totalExercises: number;
};

const CourseView = ({ courseName, courseParts, totalExercises }: CourseViewProps) => (
  <div>
    <Header courseName={courseName} />
    <Content courseParts={courseParts} />
    <Total totalExercises={totalExercises} />
  </div>
);

export default CourseView;
