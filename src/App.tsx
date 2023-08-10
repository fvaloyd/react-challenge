import { useEffect, useState } from "react";

import "./App.css";
import { TodoRepository } from "./Todos/Domain/TodoRepository";
import CreateTodoForm from "./components/todos/CreateTodoForm";
import { Todo } from "./Todos/Domain/Todo";
import TodoTable from "./components/todos/TodoTable";
import CleanCompletedBtn from "./components/todos/CleanCompletedBtn";

interface props {
  todoRepository: TodoRepository;
}

const App: React.FC<props> = ({ todoRepository }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
  todoRepository.GetAll()
    .then(todos => setTodos(todos));
  }, []);

  return (
    <main className="bg-dark vh-100 text-white">
      <div className="container py-4 col-6 col-md-6">

        <CreateTodoForm todoRepository={todoRepository} setTodos={setTodos}/>

        <TodoTable todoRepository={todoRepository} setTodos={setTodos} todos={todos} />

        {
          todos.some(t => t.Done === true) && <CleanCompletedBtn todoRepository={todoRepository} setTodos={setTodos} todos={todos}/>
        }
      </div>
    </main>
  );
};

export default App;