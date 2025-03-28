import { CourseViewProps } from '.';

type ContentProps = Pick<CourseViewProps, 'courseParts'>;

const Content = ({ courseParts }: ContentProps) => (
  <div>
    {courseParts.map(p =>
      <p key={p.name}>{p.name} {p.exerciseCount}</p>
    )}
  </div>
);

export default Content;
