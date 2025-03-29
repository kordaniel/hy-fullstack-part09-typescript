const ErrorRenderer = ({ errorMsg }: { errorMsg: string | undefined }) => {
  const style = {
    backgroundColor: "lightblue",
    color: "red",
    fontFamily: 'Arial',
    padding: '1em',
    borderStyle: 'double',
  };

  if (!errorMsg) {
    return null;
  }

  return (
    <span>
      <p style={style}>{errorMsg}</p>
    </span>
  );
};

export default ErrorRenderer;
