import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import './ProjectItem.css';

class ProjectItem extends Component {

    constructor() {
        super();
        this.state = {
            projectColor: "#808080",
            showDetails: false
        };
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.showDetails;
        this.setState({ showDetails: !currentState });
    };

    deleteProject(id) {
        console.log('Deleting project with ID: ' + id);
        this.props.onDelete(id);
    }

    getProjectColor() {
        if (this.props.project.color) {
            let project_color = (this.props.project.color).startsWith("#") ? this.props.project.color : `#${this.props.project.color}`;
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
        	<ListItem className = { `ProjectItem ${this.state.showDetails ? 'showDetails': null}` } style = { { color: this.state.projectColor } } onClick = { this.toggleClass } >
            <FontIcon className = "material-icons ProjectIcon" style = { { color: this.state.projectColor } }> work </FontIcon> 
            <strong> { this.props.project.name } </strong><FontIcon className="material-icons DeleteIcon" onClick={this.deleteProject.bind(this, this.props.project.id)}>delete</FontIcon>
            <div className = "ProjectDetails">
            <p> Budget: { this.props.project.budget || ' - ' }, suppler: { this.props.project.supplier || ' - ' }
            </p> 
            <p> Starts: { this.props.project.start_date || ' - ' }, ends: { this.props.project.end_date || ' - ' } </p> 
            </div> 
            </ListItem>
        );
    }
}

ProjectItem.propTypes = {
    onDelete: PropTypes.func,
    project: PropTypes.object
}

export default ProjectItem;