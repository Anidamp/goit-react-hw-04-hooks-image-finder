import { Component } from "react";
import { createPortal } from "react-dom";
import {Overlay, ModalPar} from "./Modal.styled"
const modalRoot = document.querySelector('#modal-root');


export default class Modal extends Component{
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey)

    }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey)
      
        
    }
  handleOverlayclick = (e) => {
   
  if (e.target === e.currentTarget) {
    this.props.onModalClose()
  }
  }
  handleEscKey = (e) =>{
    if (e.code === "Escape") {
    this.props.onModalClose()
  }
  }
    render() {
        const { largeImageURL } = this.props
            return createPortal(   <Overlay onClick ={this.handleOverlayclick}>
  <ModalPar >
    <img src={largeImageURL} alt="" />
  </ModalPar>
</Overlay>, modalRoot)
     
    }
}
