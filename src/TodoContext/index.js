import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();


function TodoProvider(props) {
  const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedItem = todos.filter(todo => todo.completed).length;
  const totalItem = todos.length;

  let searchedTodos = [];

  if(!searchValue.length > 0) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText =  todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const newItem = [...todos];
    newItem.push({
      text,
      completed: false
    });
    saveTodos(newItem);
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newItem = [...todos];
    newItem[todoIndex].completed = true;
    saveTodos(newItem);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newItem = [...todos];
    newItem.splice(todoIndex,1);
    saveTodos(newItem);
  }


  return (
    <TodoContext.Provider value={ {
      loading,
      error,
      totalItem,
      completedItem,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
      addTodo,
      openModal,
      setOpenModal
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

