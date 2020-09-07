import React, {Component} from 'react';
import ItemCards from './ItemCards/ItemCards';
import classes from './Menu.module.css';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import SeachBar from './SeachBar/SeachBar';
import { updateObject } from '../../shared/utility';


class Menu extends Component {
    state = {
        items:[],
        loading: true,
        inputValue:'',
        searchBy:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'', displayValue:'All'},
                    {value:'burgers', displayValue:'Burgers'},
                    {value:'desserts', displayValue:'Desserts'},
                    {value:'drinks', displayValue:'Drinks'},
                    {value:'sides', displayValue:'Sides'},
                    {value:'tags', displayValue:'Tags'}
                ]
            }, 
            value:''
        }
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

   searchByOnChange=(event)=>{
    // update the object => object => state
    const updatedSearchByElement = updateObject(this.state.searchBy,{
        value: event.target.value
    })

    // set the object of the state | object => state
    this.setState({searchBy: updatedSearchByElement});
   }

    itemFilterOnChange=(event)=>{
        this.setState({
            inputValue: event.target.value
        })
    }

    render() { 
        var items = this.state.items;
        // Filter by category
        if(this.state.searchBy.value){
            items = this.state.items.filter(item => {
                return item.category.toLowerCase().includes(this.state.searchBy.value.toLowerCase());
            })
        }

        if(this.state.inputValue){
            items = items.filter(item => {
                return item.name.toLowerCase().includes(this.state.inputValue.toLowerCase())
            })
        
        }

        return ( 
            <>
            <SeachBar 
                searchBy={this.state.searchBy}
                elementType={this.state.searchBy.elementType}
                elementConfig={this.state.searchBy.elementConfig}
                value={this.state.searchBy.value}
                inputValue={this.state.inputValue}
                itemFilterOnChange={(event)=>this.itemFilterOnChange(event)}
                searchByOnChange={(event)=> this.searchByOnChange(event)}/>
            <div className={classes.ItemList}>
                    <ItemCards items={items} 
                        loading={this.state.true} 
                    ></ItemCards>
            </div>

            </>
         );
    }
}
 

export default Menu;