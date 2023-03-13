import "./Message.css";

const Message = ({ message, finish }) => {
  // console.log("finish: ", finish);
  function refreshPage() {
    window.location.reload(false);
  }
  if (!finish) {
    return <div className="wrong1">{message}</div>;
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
