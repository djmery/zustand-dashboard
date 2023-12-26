import { StateCreator } from "zustand";
import { v4 as uuidV4 } from 'uuid';
import type { Task, TaskStatus } from "../../interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
//import { produce } from "immer";


interface TaskState {
    draggingTaskId?: string;

    // Record es un genérico donde la llave es un string y luego tenemos la tarea
    tasks: Record<string, Task>; // {[key:string]:Task} es similar
    getTaskByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
    totalTasks: () => number;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]]> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
    },
    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },

    totalTasks: () => {
        const tasks = get().tasks;
        return Object.values(tasks).length
    },

    addTask(title: string, status: TaskStatus) {
        const newTask = { id: uuidV4(), title, status }

        //? middleware immer
        set(state => {
            state.tasks[newTask.id] = newTask;
        }, false, 'addTask');

        //? Forma nativa Zustand        
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        //     }
        // }))
        //? Forma produce immer - requiere npm i immer
        //Podemos hacer un código más sencillo sin tener que utilizar el operador spread
        //Podemos hacerlo más sencillo, mutar el estado y al hacer la mutación generar un nuevo state
        //Tenemos que usar la función produce - para producir un nuevo estado haciendo código mutante
        //el produce lo usamos en los los lugares donde mutamos el state haciendo el operador spread
        // set(produce((state: TaskState) => {
        //     state.tasks[newTask.id] = newTask;
        // }))

    },

    setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }, false, 'setDragging'),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggin'),
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        // const task = get().tasks[taskId];
        // task.status = status;
        //? middleware immer
        set(state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            }
        }, false, 'changeTaskStatus')
        //? forma nativa zustand
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [taskId]: task
        //     }
        // }))
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return;
        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    }

});

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeApi),
            {
                name: 'task-storage'
            }

        )

    )
);