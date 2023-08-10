import { TodoRepository } from "../../Todos/Domain/TodoRepository";
import { Todo } from "../../Todos/Domain/Todo";

interface props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  todoRepository: TodoRepository;
}

const CleanCompletedBtn: React.FC<props> = ({
  todoRepository,
  todos,
  setTodos,
}) => {
  const handleClick = (): void => {
    todoRepository.DeleteCompleted()
        .then(() => todoRepository.GetAll().then((todos) => setTodos(todos)));
  };

  return (
    <button onClick={handleClick} className="btn btn-danger">
      Clean all completed todos ({todos.filter((t) => t.Done === true).length})
    </button>
  );
};

export default CleanCompletedBtn;
