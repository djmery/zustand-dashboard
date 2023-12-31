import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from './person.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';
import { DateSlice, createDateSlice } from './date.slice';
import { ConfirmationSlice, createConfirmationSlice } from './confirmation.slice';

//Crear el store

type shareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<shareState>()(
    //si queremos utilizar el middleware persist en el local storage el eventDate lo va a guardar
    // como un string y generará error en la aplicación ya que eventDate es un objeto de tipo fecha
    //para poder normalizarlo podráimos guardarlo en el createDateSlice como
    //eventDate: newDate().getTime() y en eventDate: number en lugar de Date
    //el numero para reconstruirlo a fecha sería new Date(number) 
    // si se utiliza el persist mejor utilizarlo con primitivos   
    devtools(
        (...a) => ({
            ...createPersonSlice(...a),
            ...createGuestSlice(...a),
            ...createDateSlice(...a),
            ...createConfirmationSlice(...a)
        })
    ));