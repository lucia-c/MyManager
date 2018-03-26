import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { List, ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import './UserItem.css';

class UserItem extends Component {

    render() {
        let taskItems;
        if (this.props.user.tasks) {
            taskItems = this.props.user.tasks.map((task, index) => {
                return ( 
                	<TaskItem task = { task } key = { index }/>
                );
            });
        }
        return ( 
        <ListItem className = "UserItem" disabled>
            <FontIcon className = "material-icons UserIcon" > person </FontIcon> 
            <span className = "UserName" > { this.props.user.username } </span> 
            <List > { taskItems } </List> 
            </ListItem>
        );
    }
}

UserItem.propTypes = {
    tasks: PropTypes.object
}

export default UserItem;