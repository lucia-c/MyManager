import React, { Component } from 'react';
import uuid from 'uuid';
import { Field, reduxForm } from 'redux-form'
import {
    TextField,
    DatePicker
} from 'redux-form-material-ui'
import moment from 'moment';
import validate from './validate';
import asyncValidate from './asyncValidate';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './AddProject.css';

class addProject extends Component {
    constructor() {
        super();
        this.state = {
            showAddProject: false
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.showAddProject;
        this.setState({ showAddProject: !currentState });
    };

    submit(data) {
        console.log('submitting:');
        console.log(data);
    }

    formatDates(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
        	<div className = { `addProjectBox ${this.state.showAddProject ? 'showAddProject': null}` } >
            <div className = "addProjectButton" onClick = { this.toggleClass }> 
            <FontIcon className = "material-icons addIcon" > control_point </FontIcon> 
            <span>ADD PROJECT</span > </div> 
            <form onSubmit = { handleSubmit(this.submit) } className = "addProject" >
            <Field className = "formText"
            name = "name"
            component = { TextField } hintText = "Project name" />
            <Field className = "formText"
            name = "color"
            component = { TextField } hintText = "Project color es.: #00ff00" />
            <Field className = "formText"
            name = "budget"
            component = { TextField } hintText = "Budget" / >
            <Field className = "formText"
            name = "supplier"
            component = { TextField } hintText = "Supplier" / >
            <Field className = "formDate"
            name = "start_date"
            component = { DatePicker } format = { null } hintText = "Start date DD/MM/YYYY"
            formatDate = { this.formatDates }/> 
            <Field className = "formDate"
            name = "end_date"
            component = { DatePicker } format = { null } hintText = "End date DD/MM/YYYY"
            formatDate = { this.formatDates }/>
            <div >
            <FlatButton className = "clearButton"
            label = "Clear"
            type = "submit"
            onClick = { reset } disabled = { pristine || submitting } backgroundColor = "#eeeeee" / >
            <FlatButton label = "Add project"
            type = "submit"
            value = "Submit"
            disabled = { pristine || submitting } backgroundColor = "#a4c639"
            hoverColor = "#8AA62F" / >
            </div> 
            </form>  
            </div>
        );
    }
}



export default reduxForm({
    form: 'addProjectForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['name', 'color', 'budget', 'supplier'],
    onSubmitSuccess: (result, dispatch, props) => {
        let newProject = props.values;
        newProject.id = uuid.v4();
        if (newProject.start_date) {
            newProject.start_date = moment(newProject.start_date).format('DD-MM-YYYY');
        }
        if (newProject.end_date) {
            newProject.end_date = moment(newProject.end_date).format('DD-MM-YYYY');
        }
        props.addProject(newProject);
        props.reset();
    }
})(addProject);