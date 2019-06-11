const validate = (element, formdata = []) => {
    console.log('element:', element);
    console.log('formdata:', formdata);

    let error = [true, ''];

    // test@gmail.com
    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    console.log('error:', error);

    return error;
}

export const update = (element, formdata, formName) => {
    console.log('element:', element);

    const newFormdata = {
        ...formdata
    }
    console.log('newFormdata:', newFormdata);

    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    console.log('newElement:', newElement);

    if (element.blur) {
        let validData = validate(newElement, formdata);
        console.log('validData:', validData);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;

    newFormdata[element.id] = newElement;
    console.log('newFormdata:', newFormdata);

    return newFormdata;
}

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    console.log('formdata:', formdata);
    console.log('formName:', formName);

    for (let key in formdata) {
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid
    }

    return formIsValid;
}

