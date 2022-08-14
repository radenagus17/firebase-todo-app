import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import Todo from "./Todo";

const style = {
  bg: "h-screen w-screen p-4 bg-gradient-to-r from-[#82f4b1] to-[#30c67c] flex justify-center",
  container: "bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 border-2 border-lime-400",
  heading: "text-3xl font-bold text-center text-gray-800 p-2",
  form: "flex justify-between",
  input: "border p-2 w-full text-xl focus:border-lime-500 focus:ring-lime-500 focus:outline-none focus:ring-1",
  btn: "border p-4 ml-2 bg-lime-500 text-slate-100",
  count: "text-center p-2 capitalize",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    } else {
      await addDoc(collection(db, "todos"), {
        text: input,
        completed: false,
      });
      setInput("");
    }
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  // update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
          <button className={style.btn}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul className="focus:border-lime-500">
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
}

export default App;
