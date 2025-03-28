import { CourseViewProps } from '.';

type ContentProps = Pick<CourseViewProps, 'courseParts'>;
type PartProps = {
  coursePart: ContentProps['courseParts'][0];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case 'background': return (
      <span>
        Description: <i>{coursePart.description}</i><br />
        For background material, submit to: {coursePart.backgroundMaterial}
      </span>
    );
    case 'basic': return (
      <span>
        Description: <i>{coursePart.description}</i>
      </span>
    );
    case 'group': return (
      <span>
        Project exercises: {coursePart.groupProjectCount}
      </span>
    );
    case 'special': return (
      <span>
        Description: <i>{coursePart.description}</i><br />
        Required skills: <b>{coursePart.requirements.join(', ')}</b>
      </span>
    );
    default:
      return assertNever(coursePart);
  }
};

const Content = ({ courseParts }: ContentProps) => (
  <div>
    {courseParts.map(coursePart => (
      <div key={coursePart.name}>
        <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
        <Part coursePart={coursePart} />
      </div>
    ))}
  </div>
);

export default Content;
