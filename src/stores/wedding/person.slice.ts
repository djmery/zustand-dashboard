import { StateCreator } from "zustand";

export interface PersonSlice {
    firstName: string;
    lastName: string;
    setFirstName: (setFirstName: string) => void;
    setLastName: (setLastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice, [["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value: string) => set({ firstName: value }, false, 'firstName'),
    setLastName: (value: string) => set({ lastName: value }, false, 'lastName')
})