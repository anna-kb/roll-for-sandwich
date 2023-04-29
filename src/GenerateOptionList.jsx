import React from "react";
import { useSandwichContext } from "./SandwichContext";
import { useState, useEffect } from "react";
import { getRandom, typeText } from "./Utility";
import sandwichOptions from "../data/sandwichOptions.json";
import gameOverStrings from "../data/gameOverStrings.json";

export default function GenerateOptionList() {
  const {
    optionIndex,
    dealersChoice,
    setDealersChoice,
    selectedIndex,
    setSelectedIndex,
    gameOver,
    hasClicked,
    setHasClicked,
  } = useSandwichContext();
  const [typingComplete, setTypingComplete] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const titleText = typeText(
    `Rolling for... `,
    40,
    () => setTypingComplete(true),
    !typingComplete
  );
  const gameOverText = typeText(
    gameOverStrings[randomIndex],
    18,
    () => {},
    gameOver
  );

  // Some different effects based on whether the item was selected
  // or if are enabling clicking functionality with dealer's choice
  function getListClassName(i) {
    let className = "option-item";

    if (hasClicked && selectedIndex === i) {
      className += " option-item-chosen";
    }

    return dealersChoice ? (className += " option-item-dealer") : className;
  }

  // When the game ends, choose a gameOver string randomnly.
  useEffect(() => {
    setRandomIndex(getRandom(0, gameOverStrings.length - 1));

    if (!gameOver) setTypingComplete(false);
  }, [gameOver]);

  // If it is dealer's choice, we enable the items to be clicked and push
  // the value back to App by changing the selectedIndex.
  function handleClick(option, i) {
    if (dealersChoice && !option.toLowerCase().includes("dealer's choice")) {
      setHasClicked(true);
      setSelectedIndex(i);
      setDealersChoice(false);

      const timeOut = setTimeout(() => {
        setHasClicked(false);
        setSelectedIndex(-1);
      });
    }
  }

  return (
    <div>
      {!gameOver ? (
        <div>
          <div className="options-header">
            {titleText}

            {typingComplete && (
              <span className="option-type">
                {sandwichOptions[optionIndex].type}
              </span>
            )}
          </div>
          <div className="options-list option-animation">
            {typingComplete &&
              sandwichOptions[optionIndex].options.map((option, i) => (
                <div
                  key={`${option}-${i}`}
                  onClick={() => handleClick(option, i)}
                  className={getListClassName(i)}
                >
                  {option}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="options-list">{gameOverText}</div>
      )}
    </div>
  );
}
