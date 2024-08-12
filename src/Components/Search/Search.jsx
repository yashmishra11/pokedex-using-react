import './Search.css'
function Search({ search, setSearch }) {
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div className = "search-wrapper">
        <input 
        id='pokemon-name-search'
        type="text"
        placeholder='pokemon name...'
        value={search}
        onChange={handleChange}
        />
      
    </div>
  )
}

export default Search
