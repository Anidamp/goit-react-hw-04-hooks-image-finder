import { PropTypes } from "prop-types";
import {ListItem, Img } from './ImageGalleryItems.styled';

export default function ImageGalleryItem({handleImageClick, item}){
   

        const { webformatURL, largeImageURL, tags, } = item;
        return (
           <ListItem >
   <Img src={webformatURL} alt={tags}  onClick ={() => handleImageClick(largeImageURL)} className="ImageGalleryItem-image" />
 </ListItem> 
        )
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
        webformatURL: PropTypes.string,    
        largeImageURL: PropTypes.string,
        tags: PropTypes.string,
    }),
    handleImageClick: PropTypes.func.isRequired,
}