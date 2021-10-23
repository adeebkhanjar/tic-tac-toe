import { useEffect, useState } from "react";
import GameTile from "./game_tile";

//======{GameBoard} component======//
const GameBoard = () => {
  //===The [gameBoardState] state is an object that each property it contains represents the value of a tile(text content of each of the 9 divs) but the first 2 which contain which players turn it is and a boolian for if the game is over===//
  const [gameBoardState, setGameBoardState] = useState({
    playerTurn: "x",
    gameIsOver: false,
    topLeft: "",
    topMiddle: "",
    topRight: "",
    middleLeft: "",
    middleMiddle: "",
    middleRight: "",
    bottomLeft: "",
    bottomMiddle: "",
    bottomRight: "",
  });
  //===The [history] state is an empty array that will contain each [gameBoardState] and will serve as our time line===//
  const [history, setHistory] = useState([]);
  //===useEffect is used to bypass the render on setGameBoardState and set the historyState===//
  useEffect(() => {
    setHistory([...history, { ...gameBoardState }]);
    // eslint-disable-next-line
  }, [gameBoardState]);
  //====[winVarietyArray] is an array that contains all possiable winnig combinations(arrays of 3 tiles) that will later serve us in a check for a winner (checkForWinner())
  const winVarietyArray = [
    [gameBoardState.topLeft, gameBoardState.topMiddle, gameBoardState.topRight],
    [
      gameBoardState.middleLeft,
      gameBoardState.middleMiddle,
      gameBoardState.middleRight,
    ],
    [
      gameBoardState.bottomLeft,
      gameBoardState.bottomMiddle,
      gameBoardState.bottomRight,
    ],
    [
      gameBoardState.topLeft,
      gameBoardState.middleLeft,
      gameBoardState.bottomLeft,
    ],
    [
      gameBoardState.topMiddle,
      gameBoardState.middleMiddle,
      gameBoardState.bottomMiddle,
    ],
    [
      gameBoardState.topRight,
      gameBoardState.middleRight,
      gameBoardState.bottomRight,
    ],
    [
      gameBoardState.topLeft,
      gameBoardState.middleMiddle,
      gameBoardState.bottomRight,
    ],
    [
      gameBoardState.bottomLeft,
      gameBoardState.middleMiddle,
      gameBoardState.topRight,
    ],
  ];
  //===The {mainTileFunction()} is the main function() and it is called with each <tile> click and its passed the event that calld on it===//
  const mainTileFunction = (e) => {
    //===if the game is over exit the function===//
    if (gameBoardState.gameIsOver) return;
    //===This (if) will check if the event tile's id equals an empty string===//
    if (gameBoardState[e.target.id] === "") {
      //===if so it will assign the [playerTurn]property value to it and change the [playerTurn]property value (btween x-o) and will trigger the useEffect()===//
      setGameBoardState({
        ...gameBoardState,
        [e.target.id]: gameBoardState.playerTurn,
        playerTurn: gameBoardState.playerTurn === "x" ? "o" : "x",
      });
    }
  };
  //===this function() will check for a winner and if so will return which player else it will state wich players turn it is or if its a draw===//
  const checkForWinner = () => {
    //===if the game is over exit the function===//
    if (gameBoardState.gameIsOver) return;
    //=== in this condition we loop over the  [winVarietyArray] and check if each of its inner arrays have all matching values that are not an empty string===//
    if (
      winVarietyArray.filter((winVariety) => {
        return (
          winVariety[0] === winVariety[1] &&
          winVariety[0] === winVariety[2] &&
          winVariety[0] !== ""
        );
      }).length > 0
    ) {
      //===in case there is a winner set game over to true so it stops this function() and the mainTileFunction()===//
      setGameBoardState({ ...gameBoardState, gameIsOver: true });
    } else {
      return Object.values(gameBoardState).indexOf("") > -1
        ? "Player " + gameBoardState.playerTurn.toLocaleUpperCase() + "'s turn"
        : "It's a Draw";
    }
  };
  const timeTravel = (e) => {
    setGameBoardState({
      ...history[e.target.getAttribute("data-step-number")],
    });
    setHistory(
      [...history].slice(0, e.target.getAttribute("data-step-number"))
    );
  };
  return (
    <>
      <div className="flex">
        <GameTile
          tileId={"topLeft"}
          playMove={gameBoardState.topLeft}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"topMiddle"}
          playMove={gameBoardState.topMiddle}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"topRight"}
          playMove={gameBoardState.topRight}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
      </div>
      <div className="flex">
        <GameTile
          tileId={"middleLeft"}
          playMove={gameBoardState.middleLeft}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"middleMiddle"}
          playMove={gameBoardState.middleMiddle}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"middleRight"}
          playMove={gameBoardState.middleRight}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
      </div>
      <div className="flex">
        <GameTile
          tileId={"bottomLeft"}
          playMove={gameBoardState.bottomLeft}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"bottomMiddle"}
          playMove={gameBoardState.bottomMiddle}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
        <GameTile
          tileId={"bottomRight"}
          playMove={gameBoardState.bottomRight}
          onTileClick={(e) => {
            mainTileFunction(e);
          }}
        />
      </div>
      <div className="space-between">
        <div>
          <p>{"history"}</p>
          <p className="column">
            {history.map((state, index) => {
              return index === 0 ? (
                <input
                  type="button"
                  onClick={(e) => {
                    timeTravel(e);
                  }}
                  key={index}
                  data-step-number={index}
                  value={"Starting point"}
                />
              ) : (
                <input
                  type="button"
                  onClick={(e) => {
                    timeTravel(e);
                  }}
                  key={index}
                  data-step-number={index}
                  value={"move number " + index}
                />
              );
            })}
          </p>
        </div>
        <p>
          {gameBoardState.gameIsOver
            ? gameBoardState.playerTurn === "x"
              ? "Player O wins"
              : "Player X wins"
            : checkForWinner()}
        </p>
      </div>
    </>
  );
};
export default GameBoard;
