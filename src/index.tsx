import { Component } from 'react';
import { renderIntoDocument } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { BoardState, useGameState, Value } from './GameState';

type layoutProps = {
  gap: number,
}

//why use backtics?
const Row = styled.div<layoutProps>`
display: flex;
flex-direction: row;
gap: ${(layoutProps) => layoutProps.gap}px;
`;

const Column = styled.div<layoutProps>`
display: flex:
flex-direction: column;
gap: ${(layoutProps) => layoutProps.gap}px;
`

function Game() {
  const {
    gameState,
    current,
    xIsNext,
    jumpTo,
    winner,
    handleClick

  } = useGameState(); //invoking the hook!

  return (
    <Row gap={20}>
      <Column gap={20}>
        <div>{
          winner
            ? `Winner ${winner}` //if winner indicate winner other wise indicate next player to move...
            : `Next Player ${xIsNext ? 'X' : 'O'}`
        }</div>
        <Board board={current} onClick={handleClick} />
      </Column>
      <Log history={gameState.history} jumpTo={jumpTo} />
    </Row>
  );
}
type BoardProps = {
  board: BoardState,
  onClick: (square: number) => void,
}
function Board({ board, onClick }: BoardProps) {
  return (
    <Column gap={0}>
      <Row gap={0}>
        <Square value={board[0]} onClick={() => onClick(0)} />
        <Square value={board[1]} onClick={() => onClick(1)} />
        <Square value={board[2]} onClick={() => onClick(2)} />
      </Row>
      <Row gap={0}>
        <Square value={board[3]} onClick={() => onClick(3)} />
        <Square value={board[4]} onClick={() => onClick(4)} />
        <Square value={board[5]} onClick={() => onClick(5)} />
      </Row>
      <Row gap={0}>
        <Square value={board[6]} onClick={() => onClick(6)} />
        <Square value={board[7]} onClick={() => onClick(7)} />
        <Square value={board[8]} onClick={() => onClick(8)} />
      </Row>
    </Column>
  );
}
const StyledSquare = styled.button`
width: 34px;
height 34 px
background #fff;
border: 1px solid #999;
padding: 0;
font-size: 24px;
font-weight: bold;
`;
type SquareProps = {
  value: Value,
  onClick: () => void,
}
function Square(props: SquareProps) {
  return (
    <StyledSquare onClick={props.onClick}>
      {props.value}
    </StyledSquare>
  );
}
type LogProps = {
  history: BoardState[],
  jumpTo: (step: number) => void,
}

function Log(props: LogProps) {
  return (
    <ol>
      {props.history.map((_, index) => {
        return (
          <li key={index}>
            <button onClick={() => props.jumpTo(index)}>
              Go to {index === 0 ? 'start' : `move #${index}`}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const element = <Game />
root.render(element);