import React, { useEffect, useState, useRef } from "react";
import Output from "./Output";
import Grid from "./Grid";
import { cfg } from "../config";
import Message from "./Message";
import "./Task.css";

const Task = (props) => {
  const { randomPosition, boardHeight, boardWidth, robotWidth } = cfg();
  let [y, x] = randomPosition;

  const [message, setMessage] = useState("");

  const [robot, setRobot] = useState(["120", "240"]); // prima e top, a doua left
  const [coords, setCoords] = useState([robot]);

  const [random, setRandom] = useState({ top: x, left: y });

  const [points, setPoints] = useState(0);
  const [seconds, setSeconds] = useState(600);

  const previousInputValue = useRef("");

  const endGame = useRef(false);
  const timeIsUp = useRef(false);
  const secondsRef = useRef(seconds);

  const messageOutput = (text) => {
    setMessage(`Ai pierdut... ✋⛔ Ai atins limita din ${text}!`);
  };

  // UseEffects
  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsRef.current > 0 && !endGame.current) {
        setSeconds((prevSec) => prevSec - 1);
        secondsRef.current = secondsRef.current - 1;
      }

      if (secondsRef.current === 0) {
        timeIsUp.current = true;
        setMessage(`Timpul s-a terminat! ⏱  🏁`);
      }

      if (secondsRef.current === 0) {
        setSeconds(secondsRef.current);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    youAte();
    previousInputValue.current = robot;
  }, [robot]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (!timeIsUp.current)
      if (!endGame.current) {
        switch (event.code) {
          case "ArrowLeft":
            if (Number(previousInputValue.current[1]) > 0) {
              // console.log("prev left: ", previousInputValue.current),
              setRobot([robot[0], [Number(robot[1]) - robotWidth]]);
              setMessage("");
              console.log(previousInputValue.current);
            } else {
              endGame.current = true;
              messageOutput("stanga");
            }
            break;
          case "ArrowUp":
            if (Number(previousInputValue.current.top) > 0) {
              setRobot((prevPosition) => [
                {
                  ...prevPosition,
                  top: Number(prevPosition.top) - robotWidth,
                },
              ]);
              setMessage("");
            } else {
              endGame.current = true;
              messageOutput("sus");
            }
            break;
          case "ArrowRight":
            if (
              Number(previousInputValue.current.left) <
              boardWidth - robotWidth
            ) {
              setRobot((prevPosition) => [
                {
                  ...prevPosition,
                  left: Number(prevPosition.left) + robotWidth,
                },
              ]);
              setMessage("");
            } else {
              endGame.current = true;
              messageOutput("dreapta");
            }
            break;
          case "ArrowDown":
            if (
              Number(previousInputValue.current.top) <
              boardHeight - robotWidth
            ) {
              setRobot((prevPosition) => [
                {
                  ...prevPosition,
                  top: Number(prevPosition.top) + Number(30),
                },
              ]);
              setMessage("");
            } else {
              endGame.current = true;
              messageOutput("jos");
            }
            break;
        }
      }
  };

  const handleClick = () => {};

  const youAte = () => {
    if (robot.left === random.top && robot.top === random.left + robotWidth) {
      setRobot((prevPosition) => ({
        ...prevPosition,
        left: robot.left,
        top: robot.top,
      }));
      setRandom({ top: x, left: y });
      setPoints(points + 1);
      setCoords([...coords, robot]);

      console.log("coords:", coords);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Robot - Snake - React</h1>
      <h1 className="title">Task Manager</h1>
      <br />
      Task:
      <button className="left" onClick={handleClick("stanga")}>
        Left
      </button>
      <button className="top" onClick={handleClick("sus")}>
        Top
      </button>
      <button className="right" onClick={handleClick("dreapta")}>
        Right
      </button>
      <button className="bottom" onClick={handleClick("jos")}>
        Bottom
      </button>
      <div className="wrong1">
        {!endGame.current ? (
          <div style={{ padding: 10 }}>Mai ai {seconds} secunde ramase...</div>
        ) : (
          <div style={{ padding: 10 }}>
            Ai calcat gresit... mai aveai {seconds} secunde ramase...
          </div>
        )}
        <div>Scor: {points}</div>
        <div style={{ padding: 10 }}>
          Ai facut {points} puncte in 15 de secunde 🏁
        </div>
      </div>
      <div className="row">
        <Grid robot={robot} random={random} coords={coords} />
      </div>
      <Message message={message} endGame={endGame.current} points={points} />
    </div>
  );
};
export default Task;
