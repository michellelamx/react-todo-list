import { createContext, useEffect, useReducer, useState } from 'react'
import { TodoFilters } from 'components/todo/todoFilters'
import { CreateTodo } from 'components/todo/createTodo'
import { TodoList } from 'components/todo/todoList'

const LOCAL_STORAGE_KEY = 'TODOS'
const ACTIONS = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  TOGGLE: 'TOGGLE',
  UPDATE: 'UPDATE'
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.CREATE:
      return[
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ]
    case ACTIONS.DELETE:
      return todos.filter(todo => todo.id !== payload.id)
    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed }
        }

        return todo
      })
    case ACTIONS.UPDATE:
      return todos.map(todo => {
        if(todo.id === payload.id) {
          return { ...todo, name: payload.name }
        }

        return todo
      })
    default:
      throw new Error(`No action found for ${type}.`)
  }
}

export const TodoContext = createContext()

export default function App() {
  const [filterWord, setFilterWord] = useState('')
  const [sortOrder, setSortOrder] = useState()
  const [hideCompleted, setHideCompleted] = useState(false)
  const [todos, dispatch] = useReducer(reducer, [], intialValue => {
    const storedTodo = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodo == null) return intialValue

    return JSON.parse(storedTodo)
  })

  const hiddenTodos = todos.filter(todo => {
    if (hideCompleted && todo.completed) return false
    return todo.name.includes(filterWord)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function createTodo(name) {
    dispatch({ type: ACTIONS.CREATE, payload: { name } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } })
  }

  function updateTodo(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } })
  }

  return (
    <div className='todo-wrapper'>
      <TodoContext.Provider
        value={{
          todos: hiddenTodos,
          createTodo,
          deleteTodo,
          toggleTodo,
          updateTodo,
        }}
      >
        <TodoFilters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filterWord={filterWord}
          setFilterWord={setFilterWord}
          hideCompleted={hideCompleted}
          setHideCompleted={setHideCompleted}
        />
        <TodoList />
        <CreateTodo />
      </TodoContext.Provider>
    </div>
  )
}
