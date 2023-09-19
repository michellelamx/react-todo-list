import { useContext } from 'react'
import { TodoContext } from '@/App'
import { TodoItem } from 'components/todo/todoItem'


export function TodoList() {
  const { todos } = useContext(TodoContext)

  return (
    <div className='todo-list'>
      {
        todos.length > 0 ?
          todos.map(todo => {
            return <TodoItem key={todo.id} {...todo} />
          })
        :
        <p>You have no todos yet - let's get busy!</p>
      }
    </div>
  )
}
