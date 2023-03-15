import "./Grid.css";
import { useState } from "react";
import cfg from "../config";

const Grid = ({ robot, random, coords }) => {
  return (
    <div className="grid">
      <div
        className="robot"
        style={{ top: `${robot.top}px`, left: `${robot.left}px` }}
      ></div>
      <div
        className="random"
        style={{ top: `${random.left}px`, left: `${random.top}px` }}
      ></div>
    </div>
  );
};

export default Grid;

// return (
//   <div className="grid">
//     <div
//       className="robot"
//       style={{ top: `${robot.top}px`, left: `${robot.left}px` }}
//     >
//       {/* {follow.map(([a, b]) => (
//         <div
//           key={`${a}-${b}`}
//           className="block"
//           style={{ top: a * 50, left: b * 50 }}
//         />
//       ))} */}
//     </div>
//     <div
//       className="random"
//       style={{ top: `${random.left}px`, left: `${random.top}px` }}
//     ></div>
//   </div>
// );
