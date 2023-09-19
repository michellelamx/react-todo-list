import { useContext, useRef } from 'react'
import { TodoContext } from '@/App'


export function CreateTodo() {
  // using ref instead of state to prevet re-renders since the only
  // time this value is ever set is when a new todo is first created
  const nameRef = useRef()
  const { createTodo } = useContext(TodoContext)

  function handleSubmit(e) {
    e.preventDefault()
    if (nameRef.current.value === '') return

    createTodo(nameRef.current.value)
    nameRef.current.value=''
  }

  return (
    <div className='create-todo' id='create-todo'>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='todo-input'>new todo:</label>
        <input
          autoFocus
          type='text'
          id='todo-input'
          ref={ nameRef }
        />
      </form>
    </div>
  )
}
