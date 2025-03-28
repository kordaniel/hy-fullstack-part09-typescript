import Content from './Content';
import Header from './Header';
import Total from './Total';

export interface CourseViewProps {
  courseName: string;
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
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
