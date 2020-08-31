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
// import UpdateItemModal from './UpdateItemModal/UpdateItemModal'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import { updateObject, checkValidity } from '../../../shared/utility';


export default class ItemTable extends Component {

    constructor(props) {
        super(props);
        
        this.state = 
            {
            items:[],
            loading: true,
            show: false,
            showImage: false,
            currentImage:'',
            currentImageName:'',
            showUpdateModal: false,
            currentItem: {}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(key,event) {
        const updatedItemForm = updateObject(this.state.currentItem,{[key]:event.target.value});
        this.setState({currentItem: updatedItemForm})
      }
    
    handleSubmit(event) {
        // console.log(this.state.currentItem);
        event.preventDefault();
        if(this.state.currentItem !=null){
            axios.put('http://localhost:3000/items/',this.state.currentItem).then(res=>{
                console.log(res.data);
                this.setState({showUpdateModal: !this.state.showUpdateModal})
                // call axios get and set array to to update state without  refreshing the whole page.
                this.setItemTable();
            }).catch(err=>{
                this.setState({loading:false})
            });
        }else{
            console.log("Item id missing")
        }
    }

    handleModalShow(key){
        if(key === 'show')
            this.setState({[key]: !this.state.show});
        if(key === 'showUpdateModal')
            this.setState({[key]: !this.state.showUpdateModal})
    }

     handleModalUpdate(currentUserItem){
        this.setState({
            showUpdateModal: !this.state.showUpdateModal,
            currentItem: currentUserItem
        });
     }

    handleModalImage(imageUrl,currentImageName){     
        this.setState({
            showImage: !this.state.showImage,
            currentImage: imageUrl,
            currentImageName: currentImageName
        });
    }

    componentDidMount(){
        this.setItemTable();
    }

    onRemoveItemHandler = (itemId) => {
        if(itemId){
            axios.delete('http://localhost:3000/items/'+itemId).then(res=>{
                console.log(res.data);
                this.handleModalShow('show');
                this.setItemTable();
            }).catch(err=>{
                this.setState({loading:false})
            });
        }else{
            console.log("Item id missing")
        }

    }

    setItemTable() {
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

    render() {
        // @todo: Fix spinner later
        // let items = <Spinner />
        // console.log(this.state.currentItem)

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
                        <img onClick={()=>this.handleModalImage(item.image_url,item.name)} src={item.image_url} className={classes.Photo} alt={item.name}/>
                        <ModalImage 
                            aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.state.showImage} 
                            onHide={()=>this.handleModalImage()}
                            >
                            <ModalImage.Header closeButton>Item: {item.name}</ModalImage.Header>
                            <ModalImage.Body>
                            <img src={this.state.currentImage} className={classes.PhotoModal} alt={this.state.currentImageName}/>
                            </ModalImage.Body>
                            <ModalImage.Footer>
                                <Button onClick={()=>{this.handleModalImage()}}>
                                    Close
                                </Button>
                            </ModalImage.Footer>
                        </ModalImage>
                    </td>
                    <td>
                        <button onClick={()=>{this.handleModalUpdate(item)}}><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={()=>{this.handleModalShow('show')}}><FontAwesomeIcon icon={faTrash} /></button>
                        {/* Update Modal */}
                       {/* <UpdateItemModal 
                            currentItem={this.state.currentItem} 
                            showUpdateModal={this.state.showUpdateModal} 
                            handleModalUpdate={()=>this.handleModalUpdate()}/> */}
                        <Modal 
                            aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.state.showUpdateModal} 
                            onHide={()=>this.handleModalShow('showUpdateModal')}
                            >
                            <Modal.Header closeButton>Update Item</Modal.Header>
                            <Modal.Body>
                                
                                Item Id:{this.state.currentItem.name}
                                <Form>
                                    <Form.Group controlId="itemName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" 
                                            placeholder="Enter Name" 
                                            value={this.state.currentItem.name}
                                            onChange={(event)=>this.handleChange('name',event)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" placeholder="Price" 
                                            value={this.state.currentItem.price}
                                            onChange={(event)=>this.handleChange('price',event)}/>
                                    </Form.Group>
                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Pcs</Form.Label>
                                        <Form.Control type="text" placeholder="Pcs" 
                                            value={this.state.currentItem.pcs}
                                            onChange={(event)=>this.handleChange('pcs',event)}/>
                                    </Form.Group>
                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Tags</Form.Label>
                                        <Form.Control type="text" placeholder="Tags" 
                                            value={this.state.currentItem.tags}
                                            onChange={(event)=>this.handleChange('tags',event)}/>
                                    </Form.Group>
                                    <Form.Group controlId="itemPrice">
                                        <Form.Label>Availability</Form.Label>
                                        <Form.Control type="text" placeholder="Availability" 
                                            value={this.state.currentItem.availability}
                                            onChange={(event)=>this.handleChange('availability',event)}/>
                                    </Form.Group>
                                    {/* <Form.Group controlId="itemPrice">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="text" placeholder="Image" 
                                            value={this.state.currentItem.image_url}
                                            onChange={(event)=>this.handleChange('image_url',event)}/>
                                    </Form.Group> */}
                                    {/* <Button onClick={this.handleSubmit} variant="primary" type="submit">
                                        Update
                                    </Button> */}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleSubmit} variant="primary" type="submit">
                                    Update
                                </Button>
                                <Button onClick={()=>{this.handleModalShow('showUpdateModal')}}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Delete */}
                        <Modal 
                            aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.state.show} 
                            // onclick on modal bg
                            onHide={()=>this.handleModalShow('show')}
                            >
                            <Modal.Header closeButton>Remove Item</Modal.Header>
                            <Modal.Body>
                                Are you sure you want to remove this item in the menu?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>this.onRemoveItemHandler(item.id)}>
                                    Ok
                                </Button>
                                <Button onClick={()=>{this.handleModalShow('show')}}>
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
                <h2>Menu Items</h2>
                <Table striped bordered hover className={classes.Table}>
                <thead>
                    <tr>
                    <th>ItemId</th>
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
