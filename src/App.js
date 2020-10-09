import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar'
import AuthNavBar from './Components/AuthNavbar'
import Home from './Containers/Pages/Home'
import About from './Containers/Pages/About'
import Contact from './Containers/Pages/Contact'
import Signup from './Containers/Pages/Signup'
import Login from './Containers/Pages/Login'
import Dashboard from './Containers/Pages/Dashboard';



class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`},
        })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }))
    } 
  };

  logoutHandler = () => {
    localStorage.removeItem("token")
    this.setState({
      user: null
    })
  }

  loginHandler = (userObj) => {
    // console.log(userObj)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userObj)
    }
    fetch("http://localhost:3000/api/v1/login", options)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({
        user: data.user
      }, () => this.props.history.push("/"))
    })
  }

  signupHandler = (userObj) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userObj)
    }
    fetch("http://localhost:3000/api/v1/users", options)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({
        user: data.user
      }, () => this.props.history.push("/"))
    })
  }

  render(){
    return (
      <React.Fragment>
        {this.state.user ? <AuthNavBar user={this.state.user} logoutHandler={this.logoutHandler} /> : <NavBar user={this.state.user} logoutHandler={this.logoutHandler} />}
          <Switch>
          <Route path="/dashboard" render={() => <Dashboard user={this.state.user}/>} />
            <Route path="/signup" render={()=> <Signup signupHandler={this.signupHandler} />} />
            <Route path="/login" render={()=> <Login loginHandler={this.loginHandler} />} />
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About} />
            <Route path="/" render={()=> <Home user={this.state.user} />} />
          </Switch>
      </React.Fragment>
    );
  }
}


export default withRouter(App);
