import { useEffect, useState } from "react";
import GameTile from "./game_tile";

//======{GameBoard} component======//
const GameBoard = () => {
  //===The [gameBoardState] is an array that contains an object that each property it contains represents the value of a tile(text content of each of the 9 divs)===//
  const [gameBoardState, setGameBoardState] = useState({
    // history: [],
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
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory((history) => [...history, { ...gameBoardState }]);
  }, [gameBoardState]);

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
    if (gameBoardState.gameIsOver) return;
    // console.log("gameBoardState", gameBoardState);
    // console.log("e.target.id", e.target.id);
    // console.log("gameBoardState[e.target.id]", gameBoardState[e.target.id]);
    //===The [newGameBoardStateArray] array will push each new state and will act as our time line===//
    //===This (if) will check if the event tile's id equals an empty string===//
    if (gameBoardState[e.target.id] === "") {
      //===if so it will assign the [playerTurn]property value to it and change the [playerTurn]property value (btween x-o)===//

      setGameBoardState({
        ...gameBoardState,
        // history: [{ ...gameBoardState }],
        [e.target.id]: gameBoardState.playerTurn,
        playerTurn: gameBoardState.playerTurn === "x" ? "o" : "x",
      });

      // console.log("turn.", gameBoardState.playerTurn);
    }
  };
  const checkForWinner = () => {
    if (gameBoardState.gameIsOver) return;
    if (
      winVarietyArray.filter((winVariety) => {
        // console.log("winVariety[0]");
        return (
          winVariety[0] === winVariety[1] &&
          winVariety[0] === winVariety[2] &&
          winVariety[0] !== ""
        );
      }).length > 0
    ) {
      setGameBoardState({ ...gameBoardState, gameIsOver: true });

      // return gameBoardState.playerTurn === "x"
      //   ? "Player O wins"
      //   : "Player X wins";
    } else {
      return Object.values(gameBoardState).indexOf("") > -1
        ? "Player " + gameBoardState.playerTurn.toLocaleUpperCase() + "'s turn"
        : "It's a Draw";
    }
  };
  // console.log("state.", gameBoardState);
  // console.log("history", gameBoardState.history);
  console.log("history", history);

  const timeTravel = (e) => {
    console.log("history1", history);
    console.log(e.target.getAttribute("data-step-number"));
    setGameBoardState({
      ...history[e.target.getAttribute("data-step-number")],
    });
    let temp = [...history].splice(e.target.getAttribute("data-step-number"));
    console.log("temp", temp);
    setHistory(
      [...history].slice(0, e.target.getAttribute("data-step-number"))
    );
    console.log("history2", history);
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
