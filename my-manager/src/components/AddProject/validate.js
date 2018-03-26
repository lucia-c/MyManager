const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Name Required'
    }

    if (!values.color) {
        errors.color = 'Color Required'
    } else if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/i.test(values.color)) {
        errors.color = 'Invalid color code, example #FF00FF'
    }

    if (values.budget && !/^[0-9]+(\.[0-9]{1,2})?$/i.test(values.budget)) {
        errors.budget = 'Invalid budget'
    }

    if (values.supplier && !/^[0-9]+(\.[0-9]{1,2})?$/i.test(values.supplier)) {
        errors.budget = 'Invalid supplier'
    }
    return errors
}
export default validate;