import React, { Component } from 'react'
import ItemForm from '../../components/Item/Item';
import ItemTable from '../../components/Item/ItemTable/ItemTable'
export default class Item extends Component {
    render() {
        return (
            <div>
                <ItemTable />
                <ItemForm />
            </div>
        )
    }
}
