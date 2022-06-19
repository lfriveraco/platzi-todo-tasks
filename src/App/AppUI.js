import React from "react";
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoCounter } from '../TodoCounter';
import { TodoItem } from '../TodoItem';
import { TodoList } from '../TodoList';
import { TodoSearch } from '../TodoSearch';
import { TodoContext } from "../TodoContext";

function AppUI() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoContext.Consumer>
        { ({
          error,
          loading,
          searchedTodos,
          completeTodo,
          deleteTodo
        }) => (
          <TodoList>
          { error && <p>Desesperate, hubo un error...</p>}
          { loading && <p>Estamos cargando, no desesperes...</p>}
          { (!loading && !searchedTodos.length) && <p>Crea tu primer TODO!</p> }
          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
        ) }
      </TodoContext.Consumer>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export { AppUI };