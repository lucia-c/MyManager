import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import './TaskItem.css';

class TaskItem extends Component {
    constructor() {
        super();
        this.state = {
            projectColor: "#808080"
        };
    }

    getProjectColor() {
        if (this.props.task.project_color) {
            let project_color = (this.props.task.project_color).startsWith("#") ? this.props.task.project_color : `#${this.props.task.project_color}`;
            this.setState({
                projectColor: project_color
            })
        } else {
            this.setState({
                projectColor: "#808080"
            })
        }
    }
    componentWillMount() {
        this.getProjectColor();
    }

    render() {
        return ( 
        	<ListItem className = "TaskItem" style = { { color: this.state.projectColor } } disabled>
            <strong> { this.props.task.project.name }</strong> Dal <span>{this.props.task.start_date} - {this.props.task.start_time}</span> al <span> { this.props.task.end_date } - { this.props.task.end_time } </span> </ListItem> 
        );
    }
}

TaskItem.propTypes = {
    task: PropTypes.object
}

export default TaskItem;