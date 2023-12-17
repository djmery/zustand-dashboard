import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//mport { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";


interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

// Aquí estaría toda la lógica de mi storeAPI
const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: "",
    lastName: "",
    // 'setFirstName' para que nos aparezca en redux el campo que cambiamos en lugar de anonymous - el nombre de la acción.
    // [["zustand/devtools", never]] para el tipado de devtools
    // si ponemos true reemplaza el estado anterior y solo permite hacer una modificación y es por lo que ponemos false
    setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),

});



// Aquí  sería la creación del store y mis middlewares
export const usePersonStore = create<PersonState & Actions>()(

    devtools(
        persist(
            storeAPI,
            {
                name: 'person-storage',
                //storage: customSessionStorage,
                storage: firebaseStorage
            }))
    //es el nombre del storage que yo le quiero dar por defecto en el localstorage
    //el middleware persist se encarga de buscar el person-storage, establecerlo, actualizarlo y no hay que hacer más configuración.
);