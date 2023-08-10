import { Todo } from "./Todo";

export interface TodoRepository
{
    Create: (todo: Todo) => Promise<TodoCreationStatus>,
    GetAll: () => Promise<Todo[]>,
    GetByName: (todoDesc: string) => Promise<Todo | undefined>,
    ToggleDoneByDesc: (todoDesc: string) => Promise<void>,
    DeleteCompleted: () => Promise<void>
}

export enum TodoCreationStatus
{
    EmptyDescription,
    AlreadyATodoWithThatDescription,
    Success
}