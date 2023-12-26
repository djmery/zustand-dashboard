import { useState, DragEvent } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus
}


export const useTasks = ({ status }: Options) => {

    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const addTask = useTaskStore(state => state.addTask);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Ingrese el nombre de la tarea',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe ingresar un nombre para la tarea';
                }
            }
        });
        if (!isConfirmed) return;
        addTask(value, status);
    }

    // cuando estoy dentro del elemento
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);

    }
    // cuadno salgo del elemento
    const handleDragLive = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);

    }
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);

    }
    return {
        //Properties
        isDragging,
        //Methods
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLive,
        handleDrop


    }
}
