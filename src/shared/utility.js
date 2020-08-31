export const updateObject = (oldObject, updatedProperties) =>{
    // placing in the oldObject to be updated with updatedProperties
    return {
        ...oldObject,
        ...updatedProperties
    }
}


export const checkValidity = (value, rules) =>{
    let isValid = true;

    if(rules.required){
        // set bool of the result after trimming white space
        // if it is equal to 0, set the bool
        isValid= value.trim() !== '' && isValid;
    }

    // for zip code
    if(rules.minLength){
        isValid= value.length >= rules.minLength && isValid
    }

    if(rules.maxLength){
        isValid= value.length <= rules.maxLength && isValid
    }

    // check javascript regex
    if(rules.isEmail){
        const pattern= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        isValid = pattern.test(value) && isValid
    }

    if(rules.isNumeric){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid

    }

    return isValid;
 }