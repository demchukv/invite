import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/contacts/selectors';
import { changeFilter } from '../../redux/contacts/filtersSlice';
import { Box, TextField } from "@mui/material";

const SearchBox = () => {

    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);
  
    const handleFilterChange = (filter) => dispatch(changeFilter(filter));
  
    return (
        <Box>
            <TextField
            fullWidth
            id="filter"
            name="filter"
            label="Find contacts by name or phone"
            type="text"
            value={filter}
            onChange={(evt) => handleFilterChange(evt.target.value)}
            sx={{mb:2, mt:4}}
            variant="outlined"
          />
        </Box>
  )
}

export default SearchBox