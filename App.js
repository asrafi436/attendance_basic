
import './App.css';
import { useState } from 'react';





function App() {
  const [names, setNames] = useState([{id: 1, name: "Tonmoy", isattend: true }, { id: 2, name: "Asrafi", isattend: false }]);
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(null);


  const attendList = names.filter((name) => name.isattend === true);
  const absentList = names.filter((name) => name.isattend === false);

  const addHandler = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Please enter a name");
    }
    const newName = {
      id: names.length + 1,
      name: name,
      isattend: undefined,
    };
    setNames([...names, newName]);
    setName("");
  };

  const deleteHandler = (id) => {
    const newNames = names.filter((name) => name.id !== id);
    setNames(newNames);
  };


  const editHandler = (name) => {
    setEditMode(true);
    setName(name.name);
    setUpdate(name);
  };


  const updateHandler = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return alert("No Changes");
    }

    const updatedName = names.map((nameN) => {
      if (nameN.id === update.id) {
        return { ...nameN, name: name };
      }
      return nameN;
    });

    setNames(updatedName);
    setName("");
    setEditMode(false);
    setUpdate(null);
  };


  

  const attendHandler = (name) => {
    if (name.isattend == true || name.isattend == false) {
      return alert("Already in list");
    }

    const attend = names.map((nameN) => {
      if (nameN.id == name.id) {
        return { ...nameN, isattend: true };
      }
      return nameN;
    });
    setNames(attend);
  };

  const absentHandler = (name) => {
    if (name.isattend == true || name.isattend == false) {
      return alert("Already in list");
    }
    const absent = names.map((nameN) => {
      if (nameN.id == name.id) {
        return { ...nameN, isattend: false };
      }
      return nameN;
    });
    setNames(absent);

  }


  const toggleHandler = (name) => {
    console.log(name);
    const toggle = names.map((nameN) => {
      if (nameN.id == name.id) {
        if (name.isattend == true) {
          return { ...nameN, isattend: false };
        } else {
          return { ...nameN, isattend: true };
        }
      }
      return nameN;
    });

    setNames(toggle);
  };

  console.log(name);

  return (
    <div className="App">

      <form className="input-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          onClick={editMode ? updateHandler : addHandler}
        >
          {editMode ? "Update" : "Add Name"}
        </button>
      </form>

      <div>

        <div className="all-student-list">
          <h2>All Name List</h2>

          <ul className="name-list">
            {names.map((name) => (
              <li key={name.id}>
                <span>{name.name}</span>
                <button onClick={() => deleteHandler(name.id)}>
                  Delete
                </button>
                <button onClick={() => editHandler(name)}>Edit</button>
                <button onClick={() => attendHandler(name)}>Attend</button>
                <button onClick={() => absentHandler(name)}>Absent</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="attend-student-list">
          <h2>Attend Name List</h2>
          <ul className="name-list">
            {attendList.map((name) => (
              <li key={name.id}>
                <span>{name.name}</span>
                <button onClick={() => toggleHandler(name)}>
                  Make Absent
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="absent-student-list">
          <h2>Absent Name List</h2>

          <ul className="name-list">
            {absentList.map((name) => (
              <li key={name.id}>
                <span>{name.name}</span>
                <button onClick={() => toggleHandler(name)}>Make Attend</button>
              </li>
            ))}
          </ul>
        </div>

      </div>


    </div>
  );
}

export default App;
