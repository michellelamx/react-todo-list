import { useContext, useRef, useState } from 'react'
import { TodoContext } from '../../App'

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext)
  const [isEditing, setIsEditing] = useState(false)
  const nameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    if (nameRef.current.value === "") return

    updateTodo(id, nameRef.current.value)
    setIsEditing(false)
  }

  return (
    <div className='todo-item-wrapper'>
      {isEditing ? (
        <form className='edit-todo-form' onSubmit={handleSubmit}>
          <input autoFocus type="text" defaultValue={name} ref={nameRef} />
          <button data-button-edit>save</button>
        </form>
      ) : (
        <>
          <div className='todo-item'>
            <label className='todo-item-label'>
              <input
                type='checkbox'
                checked={ completed }
                data-list-item-checkbox
                onChange={e => toggleTodo(id, e.target.checked)}
              />
              <span className='todo-name' data-content={name}>{name}</span>
            </label>
          </div>
          <div className='buttons'>
            <button
              data-button-edit
              onClick={(() => setIsEditing(true))}
            >
              edit
            </button>
            <button
              data-button-delete
              onClick={ () => deleteTodo(id) }
              className={completed ? 'inactive' : ''}
            >
              delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
