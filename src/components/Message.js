import "./Message.css";

const Message = ({ message, finish, endGame }) => {
  // console.log("finish: ", finish);
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div className="wrong1">{message}</div>
    </>
  );
  // if (!finish) {
  //   return (
  //     <>
  //       <div className="wrong1">{message}</div>
  //       {endGame === true && (
  //         <button
  //           className="refresh"
  //           style={{ display: "inline-block" }}
  //           onClick={refreshPage}
  //         >-
  //           Go again! ✨
  //         </button>
  //       )}
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <div className="wrong1">{message}</div>
  //       <button
  //         className="refresh"
  //         style={{ display: "inline-block" }}
  //         onClick={refreshPage}
  //       >
  //         Go again! ✨
  //       </button>
  //     </>
  //   );
  // }
};
export default Message;
