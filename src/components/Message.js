import "./Message.css";

const Message = ({ message, endGame, points }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  if (!endGame) {
    return (
      <>
        <div className="wrong1">{message}</div>
        {endGame === true && (
          <button
            className="refresh"
            style={{ display: "inline-block" }}
            onClick={refreshPage}
          >
            - Go again! ✨
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="wrong1">{message}</div>
        <button
          className="refresh"
          style={{ display: "inline-block" }}
          onClick={refreshPage}
        >
          Go again! ✨
        </button>
      </>
    );
  }
};
export default Message;
