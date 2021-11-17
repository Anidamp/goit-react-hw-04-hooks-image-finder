import PropTypes from 'prop-types'
import { useState } from 'react'
import {Header, SearchForm, SearchFormButton, SearchFormSpan, SearchFormInput} from './Searchbar.styled'


 

export default function Searchbar({onSubmit}) {
    
    const [searchInput, setSearchInput] = useState('')
    
    const handleChange = (e) => {
        setSearchInput(e.target.value)
    };

    const handleSubmit = (e) => {
        
        e.preventDefault()
        if (searchInput.trim() === "") {
            alert('Input something!')
            return              
        }
        onSubmit(searchInput);
        setSearchInput('');
    }

        return(
            <Header>
                <SearchForm onSubmit={handleSubmit}>
        < SearchFormButton type="submit" >
          <SearchFormSpan>Search</SearchFormSpan>
        </SearchFormButton>
    
        < SearchFormInput
          value={searchInput}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
        )
        
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}