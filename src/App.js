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
import UserWatchlist from './Containers/Pages/UserWatchlist'
import MovieSearch from './Containers/Pages/MovieSearch'
import MovieShow from './Containers/Pages/MovieShow'
import ClubsGeneral from './Containers/Pages/ClubsGeneral'
import ClubsIndex from './Containers/Pages/ClubsIndex'
import ClubsManage from './Containers/Pages/ClubsManage'
import ClubShow from './Containers/Pages/ClubShow'
import ClubWatchlist from './Containers/Pages/ClubWatchlist'
import ClubMemberIndex from './Containers/Pages/ClubMemberIndex'

// {/* <Route path="/users/:id" render={({match}) => {
//   let id = parseInt(match.params.id)
//   let foundUser = this.state.allUsers.find(user => user.id === id)
//   return(
//     <>
//     <UserWatchlist user={foundUser} />
//     {/* <Dashboard user={foundUser}/> */}
//   //   </>
//   // ) 
  // }} /> */}


class App extends React.Component {

  state = {
    // allUsers: [],
    user: null,
    movies: null,
    clubs: [],
    selectedMovieId: 0,
    selectedMovie: null,
    userWatchlistId: 0,
    userWatchlist: [] //! stretch - way to map over movie_id attributes and return movie objects found
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
      .then(data => this.setState({
        user: data.user,
        movies: data.user.movies,
        clubs: data.user.clubs,
        userWatchlist: data.user.watchlists
      }))
    } 
      fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ allUsers: data})
      })
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


  //! Used for user watchlist
  watchlistHandler = (movieObj) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(movieObj)
    }
    fetch("http://localhost:3000/api/v1/movies", options)
    .then(res => res.json())
    .then(data => {
      // data.movie.poster_path = `https://image.tmdb.org/t/p/w500${data.movie.poster_path}`
      // debugger
      let newArray = [...this.state.movies, data.movie]
        this.setState({
          selectedMovieId: data.movie.id,
          selectedMovie: data.movie,
          movies: newArray.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
        })
        this.addToWatchlist(data.movie)
    })
  }

  //! Used for user watchlist
  addToWatchlist = (movObj) => {
    // debugger
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        movie_id: movObj.id
      })
    }
    fetch("http://localhost:3000/api/v1/watchlists", options)
    .then(res => res.json())
    .then(data => {
      data.watchlist.movie.backdrop_path = `https://image.tmdb.org/t/p/original${data.watchlist.movie.backdrop_path}`
      data.watchlist.movie.mov_id = this.state.selectedMovie.mov_id
      let newArray = [...this.state.userWatchlist, data.watchlist]
      this.setState({
        userWatchlist: newArray
      })
      this.props.history.push("/my-watchlist")
    })
  }

  deleteFromUserWatchlist = (id) => {
    let foundWatchlist = this.state.userWatchlist.find(watchlist => watchlist.movie_id === id)
    let newArray = [...this.state.userWatchlist]
    newArray.splice(newArray.indexOf(foundWatchlist), 1)
    this.setState({userWatchlist: newArray})
    const options = {method: 'DELETE'}
    fetch("http://localhost:3000/api/v1/watchlists/" + foundWatchlist.id, options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      window.location.reload(false)
    })
  }

  render(){
    return (
      <React.Fragment>
      {/* <img className="site-logo" src={process.env.PUBLIC_URL + '/images/le-cine-logo.png'} style={{"height": "300px", "float": "right", "zIndex": "1"}} alt="le-cine-logo"/> */}
        {this.state.user ? <AuthNavBar user={this.state.user} logoutHandler={this.logoutHandler} /> : <NavBar user={this.state.user} logoutHandler={this.logoutHandler} />}
          <Switch>
            <Route path="/clubs/:id/member-list" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubMemberIndex user={this.state.user} id={id} />
            }}/>
            <Route path="/clubs/:id/watchlist" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubWatchlist user={this.state.user} id={id} />
            }}/>
            <Route exact path="/clubs/index" render={() => <ClubsIndex user={this.state.user} />}/>
            <Route exact path="/clubs/manage" render={() => <ClubsManage user={this.state.user} club={this.state.clubs} />}/>
            <Route path="/clubs/:id" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubShow user={this.state.user} id={id} />
            }}/>
            <Route path="/movies/search/:id" render={({match}) => {
              let id = parseInt(match.params.id)
              return <MovieShow watchlistHandler={this.watchlistHandler} id={id} />
            }} /> 
            <Route path="/dashboard" render={() => <Dashboard user={this.state.user}/>} />
            <Route path="/signup" render={()=> <Signup signupHandler={this.signupHandler} />} />
            <Route path="/movies/search" render={() => <MovieSearch user={this.state.user} watchlistHandler={this.watchlistHandler} movieShow={this.goToMovieShow} />} />
            <Route path="/my-watchlist" render={() => <UserWatchlist user={this.state.user} movies={this.state.movies} userWatchlistId={this.state.userWatchlistId} deleteHandler={this.deleteFromUserWatchlist} />} />
            <Route path="/login" render={()=> <Login loginHandler={this.loginHandler} />} />
            <Route path="/contact" component={Contact}/>
            <Route path="/clubs" render={() => <ClubsGeneral user={this.state.user} />}/>
            <Route path="/about" component={About} />
            <Route path="/" render={()=> <Home user={this.state.user} />} />
          </Switch>
      </React.Fragment>
    );
  }
}


export default withRouter(App);