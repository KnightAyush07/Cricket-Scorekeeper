import React, { useState, useEffect } from "react";
import CurrentOverBox from "./CurrentOverBox";
import RunsBox from "./RunsBox";
import ExtrasBox from "./ExtrasBox";
import TotalRunsBox from "./TotalRunsBox";
import TotalWicketsBox from "./TotalWicketsBox";
import WicketsBox from "./WicketsBox";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton"; // Import RedoButton
import DropdownMenu from "./DropdownMenu"; // Import DropdownMenu
import "./styles2.css";

const Home = () => {
  const [currentOver, setCurrentOver] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]); // New state for redo history

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
          handleAddRuns(parseInt(event.key));
          break;
        case "B":
        case "C":
        case "R":
        case "H":
        case "L":
          handleAddWicket(event.key);
          break;
        case "U":
          undoLastAction();
          break;
        case "T":
          redoLastAction(); // Handle redo action
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentOver, totalRuns, totalWickets, history, redoHistory]);

  const addHistory = (prevState) => {
    setHistory([...history, prevState]);
    setRedoHistory([]); // Clear redo history when new action is performed
  };

  const undoLastAction = () => {
    if (history.length === 0) return;

    const prevState = history[history.length - 1];
    setRedoHistory([{ currentOver, totalRuns, totalWickets }, ...redoHistory]);
    setCurrentOver(prevState.currentOver);
    setTotalRuns(prevState.totalRuns);
    setTotalWickets(prevState.totalWickets);
    setHistory(history.slice(0, -1));
  };

  const redoLastAction = () => {
    if (redoHistory.length === 0) return;

    const nextState = redoHistory[0];
    setHistory([...history, { currentOver, totalRuns, totalWickets }]);
    setCurrentOver(nextState.currentOver);
    setTotalRuns(nextState.totalRuns);
    setTotalWickets(nextState.totalWickets);
    setRedoHistory(redoHistory.slice(1));
  };

  const resetOver = () => {
    setCurrentOver([null, null, null, null, null, null]);
  };

  const handleAddRuns = (runs) => {
    const newOver = [...currentOver];
    const index = newOver.indexOf(null);

    if (index !== -1) {
      addHistory({
        currentOver,
        totalRuns,
        totalWickets,
      });
      newOver[index] = runs;
      setCurrentOver(newOver);
      setTotalRuns(totalRuns + runs);

      if (newOver.every((ball) => ball !== null)) {
        addHistory({
          currentOver: newOver,
          totalRuns,
          totalWickets,
        });
        resetOver(); // Reset or handle new over logic
      }
    }
  };

  const handleAddWicket = (wicketType) => {
    const newOver = [...currentOver];
    const index = newOver.indexOf(null);

    if (index !== -1) {
      addHistory({
        currentOver,
        totalRuns,
        totalWickets,
      });
      newOver[index] = "W";
      setCurrentOver(newOver);
      setTotalWickets(totalWickets + 1);

      if (newOver.every((ball) => ball !== null)) {
        addHistory({
          currentOver: newOver,
          totalRuns,
          totalWickets,
        });
        resetOver(); // Reset or handle new over logic
      }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/bg-image.jpg')` }}
    >
      <div className="absolute top-4 w-full px-4 flex justify-between items-start space-x-4">
        <div className="flex-shrink-0 w-1/4">
          <RunsBox onAddRuns={handleAddRuns} />
        </div>
        <div className="flex-shrink-0 w-1/2">
          <ExtrasBox onAddRuns={handleAddRuns} />
        </div>
        <div className="flex-shrink-0 w-1/4 text-right">
          <WicketsBox onAddWicket={handleAddWicket} />
        </div>
      </div>

      <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <CurrentOverBox currentOver={currentOver} />
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-4">
        <TotalRunsBox totalRuns={totalRuns} />
        <TotalWicketsBox totalWickets={totalWickets} />
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <UndoButton onUndo={undoLastAction} />
        <RedoButton onRedo={redoLastAction} />
      </div>

      <div className="absolute top-4 right-4">
        <DropdownMenu history={history} />{" "}
        {/* DropdownMenu at the top-right corner */}
      </div>
    </div>
  );
};

export default Home;
