import { CourseViewProps } from '.';

type TotalProps = Pick<CourseViewProps, 'totalExercises'>;

const Total = ({ totalExercises }: TotalProps) => (
  <p>Number of exercises {totalExercises}</p>
);

export default Total;
