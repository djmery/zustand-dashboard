
export interface Task {
    id: string;
    title: string;
    status: TaskStatus;

}
// interfaces para objetos

// type cuando quiero utilizar un tipo especializado, tipo string, boolean etc
export type TaskStatus = 'open' | 'in-progress' | 'done';