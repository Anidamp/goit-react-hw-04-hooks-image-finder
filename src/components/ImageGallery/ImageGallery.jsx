import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {GalleryImage} from './ImageGallery.styled'
import pixabayAPI from '../apiService/apiService'
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader'
import { Notification } from 'react-pnotify'
import Button from '../Button/Button';



const imgsearch = new pixabayAPI();

export default function ImageGallery({searchQuery}) {
    
  const [searchResults, setSearchResults] = useState([]);
  const [searchPoints, setSearchPoints] = useState(null);
  const [status, setStatus] = useState('init');
  const [largeURL, setlargeURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchQuery === "") {
      return
    };
    console.log(searchQuery)
    setStatus('pending')
    imgsearch.resetPage();
    imgsearch.searchQuery = searchQuery;
    imgsearch.search()
      .then(searchResults => {
        if (searchResults.hits.length > 0) {
          setSearchResults(searchResults.hits);
          setSearchPoints(searchResults.total);
          setStatus('success');
        } else {
          setErrorMessage('Nothing found!');
          setStatus('error');
        }
      });
  }, [searchQuery]);
    

  const handleImageClick = (value) => {
      console.log(value)
       setlargeURL(value);
       setStatus('modal')
    }

    const onModalClose = () => {
        setStatus('success')
    }

    const handleClick = (e) => {
            
      imgsearch.page = 1;
      imgsearch.search()
        .then(searchResults => {
          setSearchResults((prev) => [...prev, ...searchResults.hits]);
          setStatus('success')

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        })
            .catch((er) => {
              setStatus('error');
              setErrorMessage(er)
         });
        
    }

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
                      
                    < ImageGalleryItems key ={el.id} item={el} handleImageClick = {handleImageClick} />)                                      
                   
                )}
            </GalleryImage>
              {(searchPoints > 15) && <Button onClick ={handleClick} />}
          
        </>
  );
      }
     if (status === 'modal') {
         return <Modal largeImageURL={largeURL} onModalClose = {onModalClose} />
     }
   if (status === 'error') {
      
      return <Notification
        type='Error'
        title='Error'
        text={errorMessage}
       
      />
    }
  }
           
           
ImageGallery.propTypes = {
  searchQuery: PropTypes.string
}