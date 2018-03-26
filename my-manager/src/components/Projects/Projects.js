import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ProjectItem from '../ProjectItem/ProjectItem';

class Projects extends Component {


	deleteProject(id) {
		this.props.onDelete(id);
	}

	render() {
		let projectItems;

		if (this.props.projects) {
			projectItems = this.props.projects.map(project => {
				return ( 
				  <ProjectItem onDelete = { this.deleteProject.bind(this) } key = { project.id } project = { project }/>
				);
			});
		}
		return ( 
		  <div className = "Projects" >
			<h3 className = "MainSection" > Projects </h3> 
			<List className = "MainList" > { projectItems }</List> 
			</div>
		);
	}
}

Projects.propTypes = {
	projects: PropTypes.array,
	onDelete: PropTypes.func
}

export default Projects;