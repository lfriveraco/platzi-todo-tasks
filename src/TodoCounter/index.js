import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css'
const estilos = {
  color: 'red',
  backgroundColor: 'yellow'
};

function TodoCounter() {
  const {totalItem, completedItem} = React.useContext(TodoContext)
  return (
    <h2 className='TodoCounter'>Has completado {totalItem} de {completedItem} TODOs</h2>
  );
}

export { TodoCounter };