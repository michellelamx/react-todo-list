import { useContext } from 'react'
import { TodoContext } from '@/App'
import { TodoItem } from 'components/todo/todoItem'


export function TodoList() {
  const { todos } = useContext(TodoContext)

  return (
    <div className='todo-list'>
      {todos.map(todo => {
        return <TodoItem key={todo.id} {...todo} />
      })}
    </div>
  )
}
