import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import classes from './ItemCards.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

class ItemCards extends React.Component {
    state = {
        items:[],
        loading: true
     }

     componentDidMount(){
        axios.get('http://localhost:3000/items').then(res=>{
           const fetchedItems =[];
           for(let key in res.data){
               fetchedItems.push({...res.data[key]})
           }
           this.setState({loading:false, items: fetchedItems});
       }).catch(err=>{
           this.setState({loading:false})
       });
   }

    render() { 

        // @todo: Fix spinner later
        // let items = <Spinner />
        let items;
        if(!this.state.loading){
            items = this.state.items.map(item=>(
                <ItemCard key ={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    pcs={item.pcs}
                    tags={item.tags}
                    availability={item.availability} 
                    image_url ={item.image_url}

                />
            ))
        }

        return (
            <div className={classes.ItemCards}>
                <ul>
                    {items}
                </ul>
            </div>
          );
    }
}
 
export default ItemCards;