import { CourseViewProps } from '.';

type HeaderProps = Pick<CourseViewProps, 'courseName'>;

const Header = ({ courseName }: HeaderProps) => (
  <h1>{courseName}</h1>
);

export default Header;
