import { Todo } from "../Domain/Todo";
import { TodoCreationStatus, TodoRepository } from "../Domain/TodoRepository";
import { LS_TODOS_KEY } from "./Consts";

export class LSTodoRepository implements TodoRepository
{
    private Save(todos: Todo[]): void {
        localStorage.setItem(LS_TODOS_KEY, JSON.stringify(todos));
    }

    async ToggleDoneByDesc(todoDesc: string): Promise<void> {
        let todos = await this.GetAll();
        todos = todos.map(t => (t.Description === todoDesc) ? {...t, Done: !t.Done} : t);
        this.Save(todos);
    }

    async Create(todo: Todo): Promise<TodoCreationStatus> {
        if (todo.Description === '') 
            return TodoCreationStatus.EmptyDescription;
        let todos = await this.GetAll();
        if (todos.some(t => t.Description === todo.Description))
            return TodoCreationStatus.AlreadyATodoWithThatDescription;
        todos = [...todos, todo];
        this.Save(todos);
        return TodoCreationStatus.Success;
    }

    async GetAll(): Promise<Todo[]> {
        const todosJson: string | null = localStorage.getItem(LS_TODOS_KEY);
        if (!todosJson)
            return [];
        return JSON.parse(todosJson) as Todo[];
    }

    async GetByName(todoDesc: string): Promise<Todo | undefined> {
        return this
                .GetAll()
                .then(todos => todos.find(t => t.Description === todoDesc));
    }

    async DeleteCompleted(): Promise<void> {
        let todos = await this.GetAll();
        todos = todos.filter(t => t.Done !== true);
        this.Save(todos);
    }
}