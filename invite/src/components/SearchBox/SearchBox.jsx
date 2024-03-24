import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/contacts/selectors';
import { changeFilter } from '../../redux/contacts/filtersSlice';

const SearchBox = () => {

    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);
  
    const handleFilterChange = (filter) => dispatch(changeFilter(filter));
  
    return (
        <div className='input-field'>
            <input
            id="filter"
            name="filter"
            label="Find contacts by name or phone"
            type="text"
            value={filter}
            onChange={(evt) => handleFilterChange(evt.target.value)}
            className='validate'
          />
          <label htmlFor="filter">Search</label>
        </div>
  )
}

export default SearchBox