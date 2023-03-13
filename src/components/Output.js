import "./Output.css";

const Output = ({ items }) => {
  return (
    <div className="output">
      <ol className="outputOl">
        {items.map((item, index) => (
          <li key={index}>{`Comanda '${item[1]}' in ${item[0]} secunde.`}</li>
        ))}
      </ol>
    </div>
  );
};

export default Output;
