import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {


  return (
    <>
      <h2>Contador de Osos</h2>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />

      </div>

    </>
  );
};


export const BlackBears = () => {
  //No es recomendable desestructurar elstate, la desestructuración esta pendiente del cambio completo del estado
  // y se renderizan los otros componentes innecesariamente. Es mejor tomar específicamente lo que necesitamos de nuestro store
  const blackBears = useBearStore(state => state.blackBears);
  const increaseBlackBears = useBearStore(state => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const PolarBears = () => {
  const polarBears = useBearStore(state => state.polarBears);
  const increasePolarBears = useBearStore(state => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}> -1</button>

      </div>

    </WhiteCard>
  )
}


export const PandaBears = () => {
  const pandaBears = useBearStore(state => state.pandaBears);
  const increasePandaBears = useBearStore(state => state.increasePandaBears);

  return (

    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>

    </WhiteCard>
  )
}

export const BearsDisplay = () => {
  //Cuando estamos trabajando con objetos anidados en nuestro store y estamos regresando un nuevo
  //store, podemos usar el useShallow - se va a encargar las propiedades del objeto (state => state.bears) 
  //y confirmar si realmente cambiaron. si cambiaron lo va a volver a renderizar sino 
  // cambiaron no hace nada. Esto nos va a permitir trabajar con objetos anidados.

  const bears = useBearStore(useShallow(state => state.bears));
  const doNothhing = useBearStore(state => state.doNothing);
  const addBear = useBearStore(state => state.addBear);
  const clearBears = useBearStore(state => state.clearBears);

  return (
    <WhiteCard>
      <h2>Osos</h2>
      <button onClick={doNothhing}>No hace nada</button>
      <button className='mt-2' onClick={addBear}>Agregar Oso</button>
      <button className='mt-2' onClick={clearBears}>Borrar Osos</button>
      <pre>
        {JSON.stringify(bears, null, 2)}
      </pre>
    </WhiteCard>
  )
}



