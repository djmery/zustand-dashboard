import { StateCreator } from "zustand";

export interface DateSlice {
    eventDate: Date; // number, string, primitivo

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (partialDate: string) => void;
    setEventTime: (partialTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice, [["zustand/devtools", never]]> = (set, get) => ({
    eventDate: new Date(),
    eventYYYYMMDD: () => {
        //toISOString() devuelve un string con la fecha en formato ISO (yyyy-mm-ddThh:mm:ss.sssZ)
        return get().eventDate.toISOString().split('T')[0];
    },

    eventHHMM: () => {
        // el padStart(2,'0') es para que coloque ceros al inicio 01
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    },

    setEventDate: (partialDate: string) => set((state) => {
        const date = new Date(partialDate);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(state.eventDate); //necesito mutarlo y así notifica los cambios, crea una nueva fecha basada en la fecha anterior
        newDate.setFullYear(year, month, day);

        return { eventDate: newDate }
    }, false, 'setEventDate'),

    setEventTime: (parcialTime: string) => set((state) => { //HH:MM
        const hours = parseInt(parcialTime.split(':')[0]);
        const minutes = parseInt(parcialTime.split(':')[1]);
        const newDate = new Date(state.eventDate);
        newDate.setHours(hours, minutes);

        return { eventDate: newDate }
    }, false, 'setEventTime')

})