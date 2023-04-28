import React, { useContext, useState, useEffect } from "react";

const SandwichContext = React.createContext();

export function useSandwichContext() {
  return useContext(SandwichContext);
}

export const SandwichProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [optionIndex, setOptionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [dealersChoice, setDealersChoice] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [pageTransition, setPageTransition] = useState(750);

  // initialized bool to determine whether this is the first render, or an update
  useEffect(() => {
    if (optionIndex == 0) setInitialized(true);
  }, [optionIndex]);

  function finishGame() {
    setGameOver(true);
  }

  function resetGame() {
    setSelectedIndex(-1);
    setOptionIndex(0);
    setDealersChoice(false);
    setSelectedOptions([]);
    setGameOver(false);
    setInitialized(false);
  }

  return (
    <SandwichContext.Provider
      value={{
        initialized,
        pageTransition,
        selectedIndex,
        optionIndex,
        setOptionIndex,
        selectedOptions,
        setSelectedIndex,
        setSelectedOptions,
        dealersChoice,
        setDealersChoice,
        hasClicked,
        setHasClicked,
        gameOver,
        finishGame,
        resetGame,
      }}
    >
      {children}
    </SandwichContext.Provider>
  );
};
