import "./Output.css";

const Output = (props) => {
  return (
    <div className="output">
      <ol className="outputOl">
        {props.items.map((item, index) => (
          <li key={index}>{`Comanda '${item[1]}' in ${item[0]} secunde.`}</li>
        ))}
      </ol>
    </div>
  );
};

export default Output;
