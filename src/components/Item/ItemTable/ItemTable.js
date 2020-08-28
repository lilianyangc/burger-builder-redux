import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './ItemTable.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import ModalImage from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default class ItemTable extends Component {

    state = { 
        items:[],
        loading: true,
        show: false,
        showImage: false
     }

     handleModal(){
        this.setState({show: !this.state.show});
     }

    componentDidMount(){
         axios.get('http://localhost:3000/items').then(res=>{
            const fetchedItems =[];
            for(let key in res.data){
                fetchedItems.push({...res.data[key]})
            }
            // console.log(res.data);
            this.setState({loading:false, items: fetchedItems});
        }).catch(err=>{
            this.setState({loading:false})
        });
    }

    onRemoveItemHandler = (itemId) => {
        console.log(itemId)
        if(itemId){
            axios.delete('http://localhost:3000/items/'+itemId).then(res=>{
                console.log(res.data);
            }).catch(err=>{
                this.setState({loading:false})
            });
        }else{
            console.log("Item id missing")
        }
    }

    handleModalImage(){     
        this.setState({showImage: !this.state.showImage});
    }

    render() {
        // @todo: Fix spinner later
        // let items = <Spinner />
        let items;
        if (!this.state.loading){
            // console.log(this.props.orders);
            items = this.state.items.map(item=>(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.pcs}</td>
                    <td>{item.tags}</td>
                    <td>{item.availability}</td>
                    <td>
                        <img onClick={()=>this.handleModalImage()} src={item.image_url} className={classes.Photo} alt={item.name}/>
                        <ModalImage 
                            aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.state.showImage} 
                            onHide={()=>this.handleModalImage()}
                            >
                            <ModalImage.Header closeButton>Item: {item.name}</ModalImage.Header>
                            <ModalImage.Body>
                            <img src={item.image_url} className={classes.PhotoModal} alt={item.name}/>
                            </ModalImage.Body>
                            <ModalImage.Footer>
                                <Button onClick={()=>{this.handleModalImage()}}>
                                    Close
                                </Button>
                            </ModalImage.Footer>
                        </ModalImage>
                    </td>
                    <td>
                        <button><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={()=>{this.handleModal()}}><FontAwesomeIcon icon={faTrash} /></button>
                        <Modal 
                            aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.state.show} 
                            onHide={()=>this.handleModal()}
                            >
                            <Modal.Header closeButton>Remove Item</Modal.Header>
                            <Modal.Body>
                                Are you sure you want to remove this item in the menu?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>this.onRemoveItemHandler(item.id)}>
                                    Ok
                                </Button>
                                <Button onClick={()=>{this.handleModal()}}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                </tr>
               
            ))
        }

        return (
        <>           
            <div className={classes.ItemTable}>
                <h1>Menu Items</h1>
                <Table striped bordered hover className={classes.Table}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Pcs</th>
                    <th>Tags</th>
                    <th>Availability</th>
                    <th>Image</th>
                    <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
                </Table>        
            </div>
        </>
        )
    }
}
