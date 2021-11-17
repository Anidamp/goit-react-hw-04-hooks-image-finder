import { PureComponent } from "react";
import {ListItem, Img } from './ImageGalleryItems.styled';

export default class ImageGalleryItem extends PureComponent{
   

    render() {
        const { webformatURL, largeImageURL, tags, } = this.props.item;
        return (
           <ListItem >
   <Img src={webformatURL} alt={tags}  onClick ={() => this.props.handleImageClick(largeImageURL)} className="ImageGalleryItem-image" />
 </ListItem> 
        )
    }
}