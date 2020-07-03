import React from 'react';
import classes from './Input.module.css';

const input =(props)=>{
//to create amore general custom input compoenent we use a switch
    let inputElement= null;

    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType){
        case ('input'):
            // deistribute default html props
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textArea'):
                inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                {/* settingup options here, use props.elementConfig */}
                    {props.elementConfig.options.map(option=>(
                        // we use value since it is unique in this set
                        <option key={option.value} value={option.value}> 
                            {option.displayValue}
                        </option>
                    ))}
                
                </select>);
        break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
);

}
    

export default input;