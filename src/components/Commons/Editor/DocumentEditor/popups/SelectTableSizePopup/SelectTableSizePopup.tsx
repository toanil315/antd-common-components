import React from 'react';
import { StyledCell, StyledSelectTableSizePopup } from './styled';

export interface CellPosition {
  x: number;
  y: number;
}

interface Props {
  onCellClick: (position: CellPosition) => void;
}

const SelectTableSizePopup = ({ onCellClick }: Props) => {
  const [hoveredCell, setHoveredCell] = React.useState<CellPosition>({ x: 0, y: 0 });

  const renderCells = () => {
    return Array(10) // rows
      .fill(0)
      .map((_, rowIndex) => (
        <div
          key={rowIndex}
          className='row'
        >
          {Array(10) // cols
            .fill(0)
            .map((_, colIndex) => (
              <StyledCell
                onClick={() => onCellClick({ x: colIndex + 1, y: rowIndex + 1 })}
                isActive={hoveredCell?.x >= colIndex + 1 && hoveredCell?.y >= rowIndex + 1}
                onMouseOver={() => setHoveredCell({ x: colIndex + 1, y: rowIndex + 1 })}
                key={`${rowIndex}-${colIndex}`}
                className={`border-r border-b border-solid ${
                  rowIndex === 0 ? 'border-t' : 'border-t-0'
                } ${colIndex === 0 ? 'border-l' : 'border-l-0'}`}
              />
            ))}
        </div>
      ));
  };

  return (
    <StyledSelectTableSizePopup>
      {renderCells()}
      <div className='footer'>
        {hoveredCell.x}x{hoveredCell.y}
      </div>
    </StyledSelectTableSizePopup>
  );
};

export default SelectTableSizePopup;
