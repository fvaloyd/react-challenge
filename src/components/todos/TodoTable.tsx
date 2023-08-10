import { Todo } from "../../Todos/Domain/Todo";
import { TodoRepository } from "../../Todos/Domain/TodoRepository";

interface props {
  todos: Todo[];
  todoRepository: TodoRepository;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoTable: React.FC<props> = ({ todos, todoRepository, setTodos }) => {
  const toggleTodoDone = (todoDesc: string) => {
    todoRepository.ToggleDoneByDesc(todoDesc)
        .then(() => todoRepository.GetAll().then((todos) => setTodos(todos)));
  };

  return (
    <table className="table table-dark table-striped table-bordered border-secondary">
      <thead>
        <tr>
          <th>Todos</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.Description}>
            <td>
              <div className="d-flex justify-content-between">
                <span
                  className={
                    todo.Done ? "text-decoration-line-through opacity-25" : ""
                  }
                >
                  {todo.Description}
                </span>
                <input
                  type="checkbox"
                  checked={todo.Done}
                  onChange={() => toggleTodoDone(todo.Description)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
