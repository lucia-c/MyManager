import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import UserItem from '../UserItem/UserItem';

class Users extends Component {

	render() {
		let userItems;

		if (this.props.users && this.props.users.length > 0) {
			userItems = this.props.users.map(user => {
				return ( 
				  	<UserItem user = { user } key = { user.id }/>
				);
			});
		}
		return ( 
			<div className = "Users" >
			<h3 className = "MainSection" > Users Tasks </h3> 
			<List > { userItems } </List> 
			</div>
		);
	}
}

Users.propTypes = {
	users: PropTypes.array
}

export default Users;