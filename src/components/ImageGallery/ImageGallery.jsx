import { Component } from 'react'
import {GalleryImage} from './ImageGallery.styled'
import pixabayAPI from '../apiService/apiService'
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader'
import { Notification } from 'react-pnotify'
import Button from '../Button/Button';



const imgsearch = new pixabayAPI();
export default class ImageGallery extends Component {
    
    state = {
        searchResults: [],
        searchPoints:null,
        status: "init",
        largeURL: "",
        errorMessage: "",
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({ status: "pending" });
            imgsearch.resetPage();
          imgsearch.searchQuery = this.props.searchQuery;
          imgsearch.search()
            .then(searchResults => {
              if (searchResults.hits.length > 0) {
                
                this.setState({ searchResults: searchResults.hits, searchPoints: searchResults.total, status: 'success' });
              }
              else {
                this.setState({ status: 'error', errorMessage: "Nothing found!"})
              }
            });
           
                
                
        }
    };
    

    handleImageClick = (value) => {
        this.setState({
            largeURL: value,
            status: 'modal',
        })
    }
    onModalClose = () => {
        this.setState({
            status: 'success',
        })
    }
    handleClick = (e) => {
            
      imgsearch.page = 1;
      imgsearch.search()
        .then(searchResults => {
          this.setState(prev => ({
            searchResults: [...prev.searchResults, ...searchResults.hits],
            status: 'success'}));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        })
        .catch((er) => { this.setState({ status: 'error', errorMessage: er }) });
        
    }

  render() {
   const {status, searchResults, searchPoints, largeURL, errorMessage } = this.state
    if (status === 'init') {
      return <h1 className="title">Hello! What are we looking for?</h1>;
    }
   if (status === 'pending') {
     return (<Loader/>)
   }
    if (status === 'success') {
      return (
        <>
              <GalleryImage>
                  {searchResults.map(el => (
                      
                    < ImageGalleryItems key ={el.id} item={el} handleImageClick = {this.handleImageClick} />)                                      
                   
                )}
            </GalleryImage>
              {(searchPoints > 15) && <Button onClick ={this.handleClick} />}
          
        </>
      );
     }
     if (status === 'modal') {
         return <Modal largeImageURL={ largeURL} onModalClose = {this.onModalClose} />
     }
   if (status === 'error') {
      
      return <Notification
        type='Error'
        title='Error'
        text={errorMessage}
       
      />
    }
  }

   
}
           