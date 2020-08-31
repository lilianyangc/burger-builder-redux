import React, {Component} from 'react';
import ItemCards from './ItemCards/ItemCards';
import classes from './ItemList.module.css';

class ItemList extends Component {
    state = {  }

// Cart Items will be stored in the local storage
// In cart page, pull data from local storage to show cart Items

    render() { 
        return ( 
            <>
            <div className={classes.ItemList}>
                <p>List of Cards</p>
                    <ItemCards></ItemCards>
            </div>
            </>
         );
    }
}
 

export default ItemList;