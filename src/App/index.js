import React from 'react';
import { AppUI } from './AppUI';

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  if(!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifyedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifyedItem);

    setItem(newItem);
  }

  return [item, saveItem];
}

function App(props) {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

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
    <AppUI
    totalItem={totalItem}
    completedItem={completedItem}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  );
}

export default App;
