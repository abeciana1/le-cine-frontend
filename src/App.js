import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar'
import Home from './Containers/Home'
import About from './Containers/About'
import Contact from './Containers/Contact'
import Signup from './Containers/Signup'
import Login from './Containers/Login'

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
        <NavBar user={this.state.user} />
          <Switch>
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
