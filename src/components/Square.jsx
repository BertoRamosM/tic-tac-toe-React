
// eslint-disable-next-line react/prop-types
export const Square = ({ children, isSelected, updateBoard, index }) => {
  //choose the class for the turn to be played
  const className = `square ${isSelected ? "is-selected" : ""}`;

  //handle the function to upload the board
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};


