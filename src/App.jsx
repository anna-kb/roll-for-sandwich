import { useState } from "react";
import "./styles.css";
import RollButton from "./RollButton";
import SandwichBuilder from "./SandwichBuilder";
import GenerateOptionList from "./GenerateOptionList";
import { useSandwichContext } from "./SandwichContext";
import { useEffect } from "react";
import sandwichOptions from "../data/sandwichOptions.json";

function App() {
  const {
    initialized,
    selectedIndex,
    optionIndex,
    setOptionIndex,
    finishGame,
    setDealersChoice,
    setSelectedOptions,
    pageTransition,
    hasClicked,
  } = useSandwichContext();
  const [rolls, setRolls] = useState(1);

  useEffect(() => {
    if (!initialized || selectedIndex < 0) return;
    const itemSelected = sandwichOptions[optionIndex].options[selectedIndex];

    const timeout = setTimeout(() => {
      if (itemSelected.toLowerCase().includes("twice"))
        setRolls((prevRolls) => prevRolls + 1);
      else if (itemSelected.toLowerCase().includes("reroll")) {
        setRolls((prevRolls) => prevRolls);
      } else if (itemSelected.toLowerCase().includes("dealer's choice")) {
        setDealersChoice(true);
        return;
      } else {
        setRolls((prevRolls) => prevRolls - 1);
      }
    }, pageTransition);
  }, [selectedIndex]);

  useEffect(() => {
    console.log("rolls remaining " + rolls);
    if (rolls <= 0) {
      goNext();
    }
  }, [rolls]);

  // useEffect(() => {
  //   if (gameOver) setRolls(1);
  // }, [gameOver]);

  function goNext() {
    if (optionIndex + 1 >= sandwichOptions.length) finishGame();
    else setOptionIndex((prevOptionIndex) => prevOptionIndex + 1);

    setRolls(1);
  }

  useEffect(() => {
    if (!initialized || !hasClicked) {
      return;
    }

    const type = sandwichOptions[optionIndex].type;
    const option = sandwichOptions[optionIndex].options[selectedIndex];

    setSelectedOptions((prevSelectedOptions) => {
      return [...prevSelectedOptions, type + ": " + option];
    });
  }, [hasClicked]);

  function getShake() {
    return hasClicked ? " shake" : "";
  }

  return (
    <div>
      <div className="main-container">
        <div className="main-container-header">ROLL FOR SANDWICH</div>
        <div className="left-main-container">
          <div className="roll-container">
            <div className="roll-text">
              <RollButton />
            </div>
            <img
              className={"roll-image" + getShake()}
              src="../assets/d20_dice.png"
              alt="d20 Dice"
            ></img>
          </div>
          <div className="sandwich-container">
            <SandwichBuilder />
          </div>
        </div>
        <div className="options-container">
          <GenerateOptionList />
        </div>
      </div>
    </div>
  );
}

export default App;
