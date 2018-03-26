import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {
    DatePicker,
    SelectField,
    TimePicker
} from 'redux-form-material-ui'
import moment from 'moment';
import validate from './validate';
import asyncValidate from './asyncValidate';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './AddTask.css';

class addTask extends Component {
    constructor() {
        super();
        this.state = {
            showAddTask: false
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.showAddTask;
        this.setState({ showAddTask: !currentState });
    };

    submit(data) {
        console.log('Submitting:');
        console.log(data);
    }

    formatDates(date) {
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
	render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        let usersList;
        let projectsList;
        if (this.props.users && this.props.users.length > 0) {
            usersList = this.props.users.map(user => {
                return ( 
                	<MenuItem key = { user.id } value = { user } primaryText = { user.username }/>
                );
            });
        }
        if (this.props.projects && this.props.projects.length > 0) {
            projectsList = this.props.projects.map(project => {
                return ( <MenuItem key = { project.id } value = { project } primaryText = { project.name }/>
                );
            });
        }

		return (
			<div className={`addTaskBox ${this.state.showAddTask ? 'showAddTask': null}`}>
			 <div  className="addTaskButton" onClick={this.toggleClass} ><FontIcon className="material-icons addIcon">control_point</FontIcon> <span>ADD TASK</span></div>
		  	<form onSubmit={handleSubmit(this.submit)} className="addTask">
		   	<Field className="formText" name="project" component={SelectField} hintText="Choose project">
			  {projectsList}
			</Field>
			<Field className="formText" name="user" component={SelectField} hintText="Assign to user">
			  {usersList}
			</Field>

			<Field className="formDate"  name="start_date" component={DatePicker} format={null} hintText="Start date DD/MM/YYYY" formatDate={this.formatDates}/>
			<Field className="formDate" name="end_date" component={DatePicker} format={null} hintText="End date DD/MM/YYYY" formatDate={this.formatDates}/>
			<Field className="formTime"  name="start_time" component={TimePicker} format={null} hintText="Start time --:--"/>
			  <Field className="formTime"  name="end_time" component={TimePicker} format={null} hintText="End time --:--"/>
			<div>
			<div className="buttons">
			<FlatButton className="clearButton" label="Clear" type="submit" onClick={reset} disabled={pristine || submitting} backgroundColor="#eeeeee"/>
			<FlatButton  label="Add task" type="submit" value="Submit" disabled={pristine || submitting} backgroundColor="#a4c639"
		  	hoverColor="#8AA62F"/>
			</div>
			 </div>
			</form> 
			</div>
		);	
	}
}

export default reduxForm({
  form: 'addTaskForm', 
  validate,
  asyncValidate,
  asyncBlurFields: [],
  onSubmitSuccess: (result, dispatch, props) => {
	let newTask = props.values;
	if(newTask.start_date){
		newTask.start_date=moment(newTask.start_date).format('DD-MM-YYYY');
	}
	if(newTask.end_date){
		newTask.end_date=moment(newTask.end_date).format('DD-MM-YYYY');
	}
	if(newTask.start_time){
	  newTask.start_time=moment(newTask.start_time).format('HH:mm:ss');
	}
	if(newTask.end_time){
	  newTask.end_time=moment(newTask.end_time).format('HH:mm:ss');
	}
	if(newTask.user){
	  newTask.user=newTask.user.id;
	}
	if(newTask.project){
	  newTask.project_color=newTask.project.color;
	}
	props.addTask(newTask);
	props.reset();
  }
})(addTask);