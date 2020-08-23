import React, {Component} from 'react';
import ItemCards from './ItemCards/ItemCards';
import classes from './ItemList.module.css';

class ItemList extends Component {
    state = {  }
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