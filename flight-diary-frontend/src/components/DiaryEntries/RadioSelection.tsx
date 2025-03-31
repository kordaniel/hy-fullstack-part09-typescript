interface RadioSelectionProps {
  label: string;
  options: string[];
  handleChange: (value: string) => void;
};

const RadioSelection = ({ label, options, handleChange }: RadioSelectionProps) => {
  return (
    <div>
      {options.map(option =>
        <div key={option}>
          <input
            type="radio"
            name={label}
            id={option}
            value={option}
            onChange={() => handleChange(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      )}
    </div>
  );
};

export default RadioSelection;
