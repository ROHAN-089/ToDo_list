import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    // Fetch data from local storage
    let todostring = localStorage.getItem('todolist');
    if (todostring) {
      setTodolist(JSON.parse(todostring));
    }
  }, []);

  // This useEffect will save the updated todolist to localStorage
  useEffect(() => {
    if (todolist.length > 0) {
      localStorage.setItem('todolist', JSON.stringify(todolist));
    } else {
      // Clear the localStorage if the list is empty to avoid storing empty arrays
      localStorage.removeItem('todolist');
    }
  }, [todolist]);

  const handleinput = (e) => {
    setTodo(e.target.value);
  };

  const handleadd = () => {
    setTodolist([...todolist, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo(''); // Clear the input field after adding the todo
  };

  const handledone = (id) => {
    const update = todolist.map((item) => {
      if (item.id === id) {
        return { ...item, iscompleted: !item.iscompleted };
      }
      return item;
    });
    setTodolist(update);
  };

  const handledelete = (id) => {
    const update = todolist.filter((item) => item.id !== id);
    setTodolist(update);
  };

  const handleedit = (id) => {
    const t = todolist.find((item) => item.id === id);
    if (t) setTodo(t.todo);
    const update = todolist.filter((item) => item.id !== id);
    setTodolist(update);
  };

  const displayFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <div className="main">
        <div className="heading">
          <h1>DO LIST</h1>
        </div>

        <div className="container">
          <div className="addtodo">
            <h2>Add a task:</h2>
            <div className="todoinput">
              <input type="text" value={todo} onChange={handleinput} />
              <button onClick={handleadd}>SAVE</button>
            </div>
            <div className="div">
              <input type="checkbox" name="" id="" checked={showFinished} onClick={displayFinished} />
              <p>Show finished tasks</p>
            </div>
          </div>

          <div className="line"></div>

          <div className="todosbox">
            <h3>My Todos:</h3>
            <div className="todolist">
              {todolist.length === 0 && <div className="done">no tasks</div>}
              {todolist.map((item) => {
                return (showFinished || !item.iscompleted) && <div className="item" key={item.id}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => handledone(item.id)}
                        checked={item.iscompleted}
                      />
                      <p className={item.iscompleted ? 'completed' : 'notcompleted'}>
                        {item.todo}
                      </p>
                    </div>

                    <div>
                      <button onClick={() => handledelete(item.id)}><MdDeleteOutline /></button>
                      <button onClick={() => handleedit(item.id)}><MdEdit /></button>
                    </div>
                  </div>
                
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
