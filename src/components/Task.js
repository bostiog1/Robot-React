import React, { useEffect, useState, useRef } from "react";
import Output from "./Output";
import Grid from "./Grid";
import { cfg } from "../config";
import Message from "./Message";

import "./Task.css";

const Task = (props) => {
  const { randomPosition, boardHeight, boardWidth, robotWidth } = cfg();
  const [y, x] = randomPosition;

  const [remove, setRemove] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [sec, setSec] = useState();

  const [robot, setRobot] = useState({ top: "120", left: "240" });
  const [random, setRandom] = useState({ top: x, left: y });

  const previousInputValue = useRef("");
  const stateRef = useRef("");

  const finish = useRef(false);
  const endGame = useRef(false);

  const messageOutput = (text) => {
    setMessage(`Ai pierdut... ✋⛔ Ai atins limita din ${text}!`);
  };
  const handleInputChange = (event) => {
    setSec(event.target.value);
  };

  const handleClick = (param) => () => {
    if (!finish.current) {
      if (sec === undefined || sec === "" || sec === null) {
        setMessage('"Nu ai pus durata!! 😡');
      } else {
        setMessage("");
        // sec = 1 | param = 'stanga' | items = [] | setItems = [...items,[sec,param]] |
        // setItems = [1,'stanga']
        // sec = 2 | param = 'dreapta' | items = [1,'stanga'] | setItems = [...items,[sec,param]] |
        // setItems = [[1,'stanga'], [2,'dreapta']]
        // setItems([...items, [sec, param]]);
        setItems((prevItems) => [...prevItems, [sec, param]]);
        setSec("");
        // console.log("items din handleClick: ", items);
      }
    }
  };

  const handleDelete = () => {
    if (items.length === 0) {
      setRemove("");
      setItems([]);
    } else {
      // Am creat o copie a array-ului items, am sters primul element si dupa am afisat
      const newItems = [...items];
      newItems.shift();
      setItems(newItems);
    }
  };

  const youWon = () => {
    if (robot.left === random.top && robot.top === random.left + robotWidth) {
      setMessage("Felicitari!! 🎉🎉 Ai ajuns la destinatie 🏜 ");
      finish.current = true;
    }
  };
  // const youLost = () => {
  //   if (endGame.current === true) {
  //     console.log("s-a termiant");
  //   }
  // };

  useEffect(() => {
    youWon();
    // youLost();
    // console.log("finish din useEfect: ", finish);

    previousInputValue.current = robot;
  }, [robot]);

  const handleKeyDown = (event) => {
    if (!finish.current)
      if (!endGame.current) {
        // console.log("finish din handleKeyDown: ", finish);
        switch (event.code) {
          case "ArrowLeft":
            if (Number(previousInputValue.current.left) > 0) {
              // debugger;
              setRobot((prevPosition) => ({
                ...prevPosition,
                left: Number(prevPosition.left) - robotWidth,
              }));
              setMessage("");
            } else {
              endGame.current = true;
              messageOutput("stanga");
            }
            break;
          case "ArrowUp":
            if (Number(previousInputValue.current.top) > 0) {
              setRobot((prevPosition) => ({
                ...prevPosition,
                top: Number(prevPosition.top) - robotWidth,
              }));
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
              setRobot((prevPosition) => ({
                ...prevPosition,
                left: Number(prevPosition.left) + robotWidth,
              }));
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
              setRobot((prevPosition) => ({
                ...prevPosition,
                top: Number(prevPosition.top) + Number(30),
              }));
              setMessage("");
            } else {
              endGame.current = true;
              messageOutput("jos");
            }
            break;
        }
      }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    stateRef.current = items;
  }, [items]);

  // asyncron
  const wait = (sec) => {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  };

  const find = (text) => {
    switch (text) {
      case "stanga": {
        handleKeyDown({ code: "ArrowLeft" });
        break;
      }
      case "sus": {
        handleKeyDown({ code: "ArrowUp" });
        break;
      }
      case "dreapta": {
        handleKeyDown({ code: "ArrowRight" });
        break;
      }
      case "jos": {
        handleKeyDown({ code: "ArrowDown" });
        break;
      }
    }
  };

  const handleStart = async function () {
    while (stateRef.current.length > 0) {
      const sec = stateRef.current[0][0];
      const name = stateRef.current[0][1];

      await wait(sec);
      find(name);

      stateRef.current.shift();
      // console.log("items din Start: ", items, stateRef.current);
      if (stateRef.current.length >= 0) {
        setItems(stateRef.current);
      } else {
        setItems("");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Robot - React</h1>
      <h1 className="title">Task Manager</h1>
      <div className="durata">
        Durata:
        <input
          className="sec"
          type="number"
          // seteaza valoarea inputului la 'sec' daca nu este null sau undefined
          value={sec || ""}
          onChange={handleInputChange}
        />
      </div>
      <br />
      Task:
      <button
        className="left"
        onClick={handleClick("stanga")}
        // onKeyDown={handleKeyDown}
      >
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
      <div>
        <div className="add"></div>
        <button className="delete" onClick={handleDelete}>
          Sterge
        </button>
        <button className="start" onClick={handleStart}>
          Start
        </button>
      </div>
      <div className="row">
        <Output items={items} />
        <Grid robot={robot} random={random} />
      </div>
      {/* <div className="wrong1">{message}</div> */}
      <Message
        message={message}
        finish={finish.current}
        endGame={endGame.current}
      />
    </div>
  );
};
export default Task;
