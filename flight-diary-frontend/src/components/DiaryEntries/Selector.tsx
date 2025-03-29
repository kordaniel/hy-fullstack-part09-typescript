interface SelectorProps {
  includeComments: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Selector = ({ includeComments, handleCheckboxChange }: SelectorProps) => {
  return (
    <p style={{ border: "solid" }}>
      <input
        type="checkbox"
        checked={includeComments}
        onChange={handleCheckboxChange}
      /> &nbsp; Include comments
    </p>
  );
};

export default Selector;
