
export function TodoFilters({
    filterWord,
    setFilterWord,
    hideCompleted,
    setHideCompleted
  }) {

  return (
    <div className='filters'>
      <div className='filter-input'>
        <label htmlFor='filter-word'>filter:</label>
        <input
          type='text'
          id='filter-word'
          value={filterWord}
          onChange={e => setFilterWord(e.target.value)}
        />
      </div>
      <div className='clear-completed'>
        <button onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'show all' : 'hide completed'}
        </button>
      </div>
    </div>
  )
}
