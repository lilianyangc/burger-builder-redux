import React, { Component } from 'react'
import DropdownTwo from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class CustomDropdown extends Component {
    render() {
        return (
            <>
            <DropdownTwo>
            <DropdownTwo.Toggle variant="success" key='2' id="dropdown-basic-two">
                Dropdown Button
            </DropdownTwo.Toggle>
            <DropdownTwo.Menu>
                <DropdownTwo.Item href="#/action-4">Action</DropdownTwo.Item>
                <DropdownTwo.Item href="#/action-5">Another action</DropdownTwo.Item>
            </DropdownTwo.Menu>
            </DropdownTwo>    
            </>
        )
    }
}
