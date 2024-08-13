/* eslint-disable react/prop-types */
import "../index.css";
import ButtonUsage from "./ButtonUsage";
export default function Notes({ notes, onClick,  }) {
  
  return (
    <>
      {[...notes].map((note, index) => (
        <div key={index} className="text">
          {note.content}{" "}
          <ButtonUsage className="close" onClick={(id) => onClick(id)} id={note.id} />
        </div>
      ))}
    </>
  );
}
