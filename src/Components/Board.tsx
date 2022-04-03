import { Droppable } from "react-beautiful-dnd";
import { DraggableCard } from './DraggableCard';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: "transparent";
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

export function Board ({toDos, boardId}: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
      {(provided, info) => (
        <Area 
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} index={index} toDo={toDo} />
          ))}
          {provided.placeholder}
        </Area>
      )}
    </Droppable>
    </Wrapper>
  );
}

export default Board;