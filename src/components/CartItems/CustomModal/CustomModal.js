import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function CustomModal(props) {
    return (
        <Modal show={props.showRemoveItemModal} onHide={props.removeItemHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.removeItemHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.removeItemHandler}>
            Confirm Remove
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
