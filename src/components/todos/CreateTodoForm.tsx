import { useState } from "react";
import swal from "sweetalert2";

import {
  TodoCreationStatus,
  TodoRepository,
} from "../../Todos/Domain/TodoRepository";
import { Todo } from "../../Todos/Domain/Todo";

interface props {
  todoRepository: TodoRepository;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CreateTodoForm: React.FC<props> = ({ todoRepository, setTodos }) => {
  const [newTodoDescription, SetNewTodoDescription] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const creationStatus = await todoRepository.Create({
      Description: newTodoDescription,
      Done: false,
    });

    switch (creationStatus) {
      case TodoCreationStatus.EmptyDescription:
        swal.fire({
          title: "Validation error",
          text: "Todo description cannot be an empty string",
          icon: "error",
        });
        break;
      case TodoCreationStatus.AlreadyATodoWithThatDescription:
        swal.fire({
          title: "An error occurs",
          text: "There is already a todo with that description",
          icon: "error",
        });
        break;
      case TodoCreationStatus.Success:
        todoRepository.GetAll().then((todos) => {
            setTodos(todos)
            SetNewTodoDescription("");
        });
        return;
      default:
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 d-flex flex-column flex-lg-row  justify-content-between"
    >
      <div className="col-12 col-lg-9 mb-2">
        <input
          value={newTodoDescription}
          type="text"
          onChange={(e) => SetNewTodoDescription(e.target.value)}
          placeholder="New todo"
          className="form-control"
        />
      </div>
      <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end">
        <button type="submit" className="btn btn-primary">
          Save todo
        </button>
      </div>
    </form>
  );
};

export default CreateTodoForm;
