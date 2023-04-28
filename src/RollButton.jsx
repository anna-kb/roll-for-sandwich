import React, { useState } from "react";
import { getRandom } from "./Utility";
import { useSandwichContext } from "./SandwichContext";
import { useEffect } from "react";
import sandwichOptions from "../data/sandwichOptions.json";

export default function RollButton({}) {
  const {
    setSelectedIndex,
    gameOver,
    resetGame,
    optionIndex,
    dealersChoice,
    hasClicked,
    setHasClicked,
    pageTransition,
  } = useSandwichContext();
  const [maxNumber, setMaxNumber] = useState(6);

  useEffect(() => {
    setMaxNumber(sandwichOptions[optionIndex].options.length - 1);
  }, [optionIndex, []]);

  function handleClick() {
    setHasClicked(true);

    const randomIndex = getRandom(0, maxNumber);
    setSelectedIndex(randomIndex);
    const timeOut = setTimeout(() => {
      setHasClicked(false);
      setSelectedIndex(-1);
    }, pageTransition);
  }

  return (
    <div>
      {gameOver ? (
        <label htmlFor="resetButton">
          <button id="resetButton" onClick={resetGame} disabled={hasClicked}>
            Try Again?
          </button>
        </label>
      ) : (
        <label htmlFor="rollButton">
          <button
            id="rollButton"
            onClick={handleClick}
            disabled={hasClicked || dealersChoice}
          >
            {dealersChoice ? "Dealer's Choice!" : "Roll here!"}
          </button>
        </label>
      )}
    </div>
  );
}
