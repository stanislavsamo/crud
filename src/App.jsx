import { useEffect, useState } from "react";
import "./index.css";
import moment from "moment-timezone";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  const [state, setStates] = useState([]);

  const [update, setUpdate] = useState();

  function loadData() {
    setTimeout(() => {
      fetch("http://localhost:7070/notes/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setStates(data);
        });
    }, 2000);
  }

  useEffect(loadData, []); // componentDidMount

  const handleChange = (event) => {
    setUpdate({ content: event.target.value });
  };
  function saveData() {
    let data = JSON.stringify(update);
    fetch("http://localhost:7070/notes/", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((res) => console.log(res));
  }
  const onSubmit = (event) => {
    event.preventDefault();

    saveData();
  };

  const deleteNote = (id) => {
    fetch("http://localhost:7070/notes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((res) => console.log(res));
  };
  useEffect(deleteNote, []);

  //******************************************** */

  const clock = moment().format("LTS").toString(); //new Date().toLocaleTimeString();
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
      loadData();
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [state]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" gutterBottom>
      <div className="note">
        <Notes
          className="text"
          notes={state}
          onClick={(id) => deleteNote(id)}
        />
      </div>
      <div className="add-note">
        <AddNote onSubmit={onSubmit} handleChange={handleChange} />
      </div>
</Typography>
      </Box>
    </Container>
  );
}

export default App;
