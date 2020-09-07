import React, { Component } from 'react'
import ITable from './ITable/ITable'
import CreateItem from './CreateItem/CreateItem'

export default class ItemTable extends Component {
    render() {
        return (
            <div>
                <ITable />
                <CreateItem />
            </div>
        )
    }
}
