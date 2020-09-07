import React from 'react'
import Input from '../../../components/UI/Input/Input';

export default function SeachBar(props) {
    return (
        <div>
            <p>search bar</p>
            <label>Search by 
                <Input 
                    elementType={props.elementType}
                    elementConfig={props.elementConfig}
                    value={props.value}
                    changed={props.searchByOnChange}
                />
            </label>
            <input type="text" value={props.inputValue} onChange={props.itemFilterOnChange}/>
        </div>
    )
}
