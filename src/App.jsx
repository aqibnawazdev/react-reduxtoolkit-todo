import { useState } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { deleteTodo, addTodo, updateTodo } from "./features/todoSlice";

function App() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todoReducer.todos);
  console.log(todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (editId) {
      dispatch(updateTodo({ id: editId, content: input }));
      setEditId(null);
    } else {
      dispatch(addTodo({ id: Math.random() + 1 * 2, content: input }));
    }
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleEdit = (id, content) => {
    setEditId(id);
    setInput(content);
  };

  return (
    <div className="container md:w-[50%] mx-auto">
      <div className="grid grid-cols-1 gap-1 border-b py-2">
        <input
          type="text"
          value={input}
          placeholder="Enter todo"
          onChange={(e) => setInput(e.target.value)}
          className="border p-1 py-2 focus:border-purple-700 focus:outline-none rounded"
        />
        <button
          className="bg-purple-700 p-2 w-[100px] rounded text-white hover:bg-purple-900 mt-2"
          onClick={handleAddTodo}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <div className="w-full flex flex-col gap-1 todos-container bg-gray-100 rounded mt-2 p-2">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center gap-1  "
          >
            <span className="text-xl capitalize">{todo.content}</span>
            <div>
              <button
                className="bg-blue-500 text-white p-1 rounded mr-2"
                onClick={() => handleEdit(todo.id, todo.content)}
              >
                <TbEdit />
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDelete(todo.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
