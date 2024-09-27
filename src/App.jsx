import { useState, useEffect, useCallback } from "react";
import CurrentOverBox from "./component/CurrentOverBox";
import RunsBox from "./component/RunsBox";
import ExtrasBox from "./component/ExtrasBox";
import TotalRunsBox from "./component/TotalRunsBox";
import TotalWicketsBox from "./component/TotalWicketsBox";
import WicketsBox from "./component/WicketsBox";
import UndoButton from "./component/UndoButton";
import RedoButton from "./component/RedoButton";
import SixesFoursBox from "./component/SixesFoursBox";
import OversSelector from "./component/OversSelector";
import InningsEndBox from "./component/InningsEndBox";
import grassImage from "/src/assets/grass.jpg";
import "./styles2.css";

const App = () => {
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
  const [sixes, setSixes] = useState(0);
  const [fours, setFours] = useState(0);
  const [oversCount, setOversCount] = useState(null); // Track number of overs
  const [completedOvers, setCompletedOvers] = useState(0); // Track completed overs
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [actionId, setActionId] = useState(0);
  const [inningsEnded, setInningsEnded] = useState(false); // Track if innings has ended

  const addHistory = useCallback(
    (prevState) => {
      setHistory([...history, { ...prevState, id: actionId }]);
      setRedoHistory([]);
      setActionId(actionId + 1);
    },
    [history, actionId]
  );

  const undoLastAction = useCallback(() => {
    if (history.length === 0) return;

    const prevState = history[history.length - 1];
    setRedoHistory([
      {
        currentOver,
        totalRuns,
        totalWickets,
        sixes,
        fours,
        completedOvers,
        id: actionId,
      },
      ...redoHistory,
    ]);
    setCurrentOver(prevState.currentOver);
    setTotalRuns(prevState.totalRuns);
    setTotalWickets(prevState.totalWickets);
    setSixes(prevState.sixes);
    setFours(prevState.fours);
    setCompletedOvers(prevState.completedOvers);
    setHistory(history.slice(0, -1));
    setActionId(prevState.id);
  }, [
    history,
    currentOver,
    totalRuns,
    totalWickets,
    sixes,
    fours,
    completedOvers,
    redoHistory,
    actionId,
  ]);

  const redoLastAction = useCallback(() => {
    if (redoHistory.length === 0) return;

    const nextState = redoHistory[0];
    setHistory([
      ...history,
      {
        currentOver,
        totalRuns,
        totalWickets,
        sixes,
        fours,
        completedOvers,
        id: actionId,
      },
    ]);
    setCurrentOver(nextState.currentOver);
    setTotalRuns(nextState.totalRuns);
    setTotalWickets(nextState.totalWickets);
    setSixes(nextState.sixes);
    setFours(nextState.fours);
    setCompletedOvers(nextState.completedOvers);
    setRedoHistory(redoHistory.slice(1));
    setActionId(nextState.id);
  }, [
    history,
    currentOver,
    totalRuns,
    totalWickets,
    sixes,
    fours,
    completedOvers,
    redoHistory,
    actionId,
  ]);

  const resetOver = useCallback(() => {
    setCurrentOver([null, null, null, null, null, null]);
  }, []);

  const handleAddRuns = useCallback(
    (runType) => {
      if (inningsEnded) return; // Prevent input if innings have ended

      let newOver = [...currentOver];
      let index = newOver.indexOf(null);

      if (index === -1) {
        // If over is full, reset and start a new over
        resetOver();
        newOver = [null, null, null, null, null, null];
        index = 0;
        setCompletedOvers((prev) => prev + 1); // Increment completed overs
      }

      if (index !== -1) {
        addHistory({
          currentOver,
          totalRuns,
          totalWickets,
          sixes,
          fours,
          completedOvers,
        });

        if (
          runType === "NB" ||
          runType === "Wd" ||
          runType === "LB" ||
          runType === "BY"
        ) {
          if (runType === "NB" || runType === "Wd") {
            newOver = [...newOver, null];
          }
          newOver[index] = runType;
          setCurrentOver(newOver);
          setTotalRuns((prevRuns) => prevRuns + 1);
        } else {
          newOver[index] = runType;
          setCurrentOver(newOver);
          setTotalRuns((prevRuns) => prevRuns + parseInt(runType));

          if (runType === "6") {
            setSixes((prevSixes) => prevSixes + 1);
          } else if (runType === "4") {
            setFours((prevFours) => prevFours + 1);
          }
        }
      }

      if (newOver.every((ball) => ball !== null)) {
        addHistory({
          currentOver: newOver,
          totalRuns,
          totalWickets,
          sixes,
          fours,
          completedOvers,
        });
      }
    },
    [
      currentOver,
      totalRuns,
      totalWickets,
      sixes,
      fours,
      addHistory,
      resetOver,
      completedOvers,
      inningsEnded,
    ]
  );

  const handleAddWicket = useCallback(
    (wicketType) => {
      if (inningsEnded) return; // Prevent input if innings have ended

      let newOver = [...currentOver];
      let index = newOver.indexOf(null);

      if (index === -1) {
        resetOver();
        newOver = [null, null, null, null, null, null];
        index = 0;
        setCompletedOvers((prev) => prev + 1);
      }

      if (index !== -1) {
        addHistory({
          currentOver,
          totalRuns,
          totalWickets,
          sixes,
          fours,
          completedOvers,
        });

        newOver[index] = "W";
        setCurrentOver(newOver);
        setTotalWickets((prevWickets) => prevWickets + 1);

        if (totalWickets + 1 >= 10) {
          setInningsEnded(true); // End innings if 10 wickets are reached
        }
      }

      if (newOver.every((ball) => ball !== null)) {
        addHistory({
          currentOver: newOver,
          totalRuns,
          totalWickets,
          sixes,
          fours,
          completedOvers,
        });
      }
    },
    [
      currentOver,
      totalRuns,
      totalWickets,
      sixes,
      fours,
      addHistory,
      resetOver,
      completedOvers,
      inningsEnded,
    ]
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (inningsEnded) return; // Prevent input if innings have ended

      switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
          handleAddRuns(event.key);
          break;
        case "B":
          handleAddWicket("B");
          break;
        case "C":
          handleAddWicket("C");
          break;
        case "R":
          handleAddWicket("R");
          break;
        case "H":
          handleAddWicket("H");
          break;
        case "L":
          handleAddWicket("L");
          break;
        case "U":
          undoLastAction();
          break;
        case "T":
          redoLastAction();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    handleAddRuns,
    handleAddWicket,
    undoLastAction,
    redoLastAction,
    inningsEnded,
  ]);

  const startInnings = (selectedOvers) => {
    setOversCount(selectedOvers);
    setCompletedOvers(0);
    setTotalWickets(0); // Reset total wickets when innings start
    setInningsEnded(false); // Reset innings ended state
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${grassImage})` }}
    >
      {!oversCount ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <OversSelector onStart={startInnings} />
        </div>
      ) : (
        <>
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
            <CurrentOverBox
              currentOver={currentOver}
              overNumber={completedOvers + 1}
            />
          </div>

          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <SixesFoursBox sixes={sixes} fours={fours} />
          </div>

          <div className="absolute bottom-4 left-4 flex space-x-4">
            <TotalRunsBox totalRuns={totalRuns} />
            <TotalWicketsBox totalWickets={totalWickets} />
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-4">
            <UndoButton onUndo={undoLastAction} />
            <RedoButton onRedo={redoLastAction} />
          </div>

          {completedOvers >= oversCount || totalWickets >= 10 ? (
            <InningsEndBox totalRuns={totalRuns} totalWickets={totalWickets} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
