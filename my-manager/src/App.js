import React, { Component } from 'react';
import Projects from './components/Projects/Projects';
import Users from './components/Users/Users';
import AddProject from './components/AddProject/AddProject';
import AddTask from './components/AddTask/AddTask';
import showResults from "./showResults";
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
            users:[],
            tasks:[]
        };
    }

    getProjects() {
        var self = this;
        $.getJSON('http://testfe.20tab.com/api/team/projects/', function(data) {
            self.setState({ projects: data })
        });
    }

    getUsers() {
        var self = this;
        $.getJSON('http://testfe.20tab.com/api/users/', function(data) {
            self.setState({ users: data })
        });
    }

    getTasks() {
        var self = this;
        $.getJSON('http://testfe.20tab.com/api/team/tasks/', function(data) {
            self.setState({ tasks: data })
        });
    }

    handleAddProject(project) {
	    let projects = this.state.projects;
	    projects.push(project);
	    this.setState({projects: projects})
	}
    handleDeleteProject(id) {
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);
        projects.splice(index, 1);
        this.setState({projects:projects});
      }

    handleAddTask(task) {
        let tasks = this.state.tasks;        
        this.assignTaskToUser(task);
        tasks.push(task);
        this.setState({tasks: tasks});
    }

    assignTaskToUser(task){
        let users = this.state.users;
        let foundIndex = users.findIndex(x => x.id === task.user);
        users[foundIndex].tasks.push(task);
        this.setState({users:users});
        this.setState({users:users});
    }

    componentWillMount() {
        this.getProjects();
        this.getUsers();
        this.getTasks();
    }


    render() {
        return ( <MuiThemeProvider><div className = "App" >
            <header className = "App-header" >
            <img src = { logo } className = "App-logo"
            alt = "logo" / >
            <h1 className = "App-title" > My Manager </h1>  
            </header> 
            <AddProject onSubmit={showResults} addProject={this.handleAddProject.bind(this)} />
            <Projects onDelete={this.handleDeleteProject.bind(this)} projects = { this.state.projects }/>
            <AddTask onSubmit={showResults} addTask={this.handleAddTask.bind(this)} users={this.state.users} projects={ this.state.projects}/> 
            <Users users={this.state.users}/> 
            </div></MuiThemeProvider>
        );
    }
}
export default App;