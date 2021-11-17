import PropTypes from 'prop-types'
import { Component } from 'react'
import {Header, SearchForm, SearchFormButton, SearchFormSpan, SearchFormInput} from './Searchbar.styled'


 

export default class Searchbar extends Component {
    
    state = {
        searchInput: "",
    };
    
    handlerChange = (e) => {
        this.setState({ searchInput: e.target.value })
    };

    onSubmit = (e) => {
        
        e.preventDefault()
        if (this.state.searchInput.trim() === "") {
            alert('Input something!')
            return              
        }
        this.props.onSubmit(this.state.searchInput)
        this.setState({searchInput: ""})
    }

    render() {

        return(
            <Header>
                <SearchForm onSubmit={this.onSubmit}>
        < SearchFormButton type="submit" >
          <SearchFormSpan>Search</SearchFormSpan>
        </SearchFormButton>
    
        < SearchFormInput
          value={this.state.searchInput}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handlerChange}
        />
      </SearchForm>
    </Header>
        )
        
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}