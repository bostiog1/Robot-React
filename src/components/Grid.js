import "./Grid.css";

const Grid = ({ robot, random, coords }) => {
  // console.log('coords din grid: ',coords)
  return (
    <div className="grid">
      <div
        className="robot"
        style={{ top: `${robot[0]}px`, left: `${robot[1]}px` }}
      ></div>
      {coords.length > 1 &&
        coords.map((item, index) => (
          <div
            className="robot"
            key={index}
            style={{ top: `${item.top}px`, left: `${item.left}px` }}
          ></div>
        ))}

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
