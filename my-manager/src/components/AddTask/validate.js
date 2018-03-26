const validate = values => {
    const errors = {}
    if (!values.user) {
        errors.user = 'User Required'
    }

    if (!values.project) {
        errors.project = 'Project Required'
    }
    return errors
}
export default validate;