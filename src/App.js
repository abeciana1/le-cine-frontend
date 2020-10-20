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
import ClubsIndex from './Containers/Pages/ClubsIndex'
import ClubsManage from './Containers/Pages/ClubsManage'
import ClubShow from './Containers/Pages/ClubShow'
import ClubWatchlist from './Containers/Pages/ClubWatchlist'
import ClubMemberIndex from './Containers/Pages/ClubMemberIndex'
import ClubMeetingsIndex from './Containers/Pages/ClubMeetingsIndex'
import ClubMeetingShow from './Containers/Pages/ClubMeetingShow'
import ClubsAll from './Containers/Pages/ClubsAll'
import HostClubsAll from './Containers/Pages/HostClubsAll'

class App extends React.Component {

  state = {
    user: null,
    movies: null,
    clubs: [],
    selectedMovieId: 0,
    selectedMovie: null,
    userWatchlistId: 0,
    userWatchlist: [], //! stretch - way to map over movie_id attributes and return movie objects found
    wrongCredentials: false,
    userClubs: [],
    hostClubs: []
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
      .then(data => {

        this.setState({
          user: data.user,
          movies: data.user.movies,
          clubs: data.user.clubs,
          userWatchlist: data.user.watchlists,
          userClubs: data.user.user_clubs,
          hostClubs: data.user.host_clubs
        })
      })
    } 
      fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ allUsers: data})
      })
    };

  logoutHandler = () => {
    localStorage.clear()
    this.setState({
      user: null //,
      // userLoggedOut: true
    }, () => this.props.history.push("/"))
  }

  loginHandler = (userObj) => {
    console.log(userObj)
    // debugger
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: userObj.email,
          password: userObj.password
        }
      })
    }
    fetch("http://localhost:3000/api/v1/login", options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // debugger
      if(data.user){
        localStorage.setItem("token", data.jwt)
        this.setState({
          user: data.user
        }, () => this.props.history.push("/"))
      } else {
        this.setState({
          wrongCredentials: true
        }, () => localStorage.clear())
      }
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
    let newArray = [...this.state.movies, movieObj.movie]
    this.setState({
      selectedMovieId: movieObj.movie.id,
      selectedMovie: movieObj.movie,
      movies: newArray.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
    })

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        movie_id: movieObj.movie.id
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
    })
  }

  deleteFromUserWatchlist = (id) => {
    let newArray = [...this.state.userWatchlist]
    let foundWatchlist = newArray.find(watchlist => watchlist.id === id)
    newArray.splice(newArray.indexOf(foundWatchlist), 1)
    this.setState({
      userWatchlist: newArray
    })
    const options = {method: 'DELETE'}
    fetch("http://localhost:3000/api/v1/watchlists/" + id, options)
    .then(res => res.json())
  }

  addToClubWatchlist = (clubId, movie) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        club_id: clubId,
        movie_id: movie
      })
    }
    fetch("http://localhost:3000/api/v1/club_watchlists", options)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
  }

  deleteUserFromClub = (id) => {
    let newArray = [...this.state.userClubs]
    let foundClub = newArray.find(club => club.id === id)
    newArray.splice(newArray.indexOf(foundClub), 1)
    this.setState({
      userClubs: newArray
    })
    const options = {method: 'DELETE'}
    fetch("http://localhost:3000/api/v1/user_clubs/" + foundClub.id, options)
    .then(res => res.json())
  }

  joinClubHandler = (userClubObj) => {
    let newArray = [...this.state.userClubs, userClubObj]
    newArray.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
    this.setState({ userClubs: newArray})
  }

  render(){
    return (
      <React.Fragment>
        {this.state.user ? <AuthNavBar user={this.state.user} logoutHandler={this.logoutHandler} /> : <NavBar user={this.state.user} logoutHandler={this.logoutHandler} />}
          <Switch>
          <Route path="/clubs/:club_id/meetings/:meeting_id" render={({match}) => {
              let meeting_id = parseInt(match.params.meeting_id)
              let club_id = parseInt(match.params.club_id)
              return <ClubMeetingShow user={this.state.user} club_id={club_id} meeting_id={meeting_id} />
            }}/>
          <Route path="/clubs/:id/meetings" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubMeetingsIndex user={this.state.user} id={id} />
            }}/>
            <Route path="/clubs/:id/member-list" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubMemberIndex user={this.state.user} id={id} />
            }}/>
            <Route path="/clubs/:id/watchlist" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubWatchlist user={this.state.user} id={id} />
            }}/>
            <Route exact path="/clubs/index" render={() => <ClubsIndex user={this.state.user} />}/>
            <Route exact path="/clubs/all" render={() => <ClubsAll user={this.state.user} userClubs={this.state.userClubs} />}/>
            <Route exact path="/clubs/hosted-all" render={() => <HostClubsAll user={this.state.user} hostClubs={this.state.hostClubs} />}/>
            <Route exact path="/clubs/manage" render={() => <ClubsManage user={this.state.user} clubs={this.state.clubs} userClubs={this.state.userClubs} deleteUserFromClub={this.deleteUserFromClub} />}/>
            <Route path="/clubs/:id" render={({match}) => {
              let id = parseInt(match.params.id)
              return <ClubShow user={this.state.user} joinClubHandler={this.joinClubHandler} id={id} />
            }}/>
            <Route path="/movies/search/:id" render={({match}) => {
              let id = parseInt(match.params.id)
              return <MovieShow addToClub={this.addToClubWatchlist} user={this.state.user} watchlistHandler={this.watchlistHandler} id={id} />
            }} /> 
            <Route path="/dashboard" render={() => <Dashboard user={this.state.user} userClubs={this.state.userClubs} hostClubs={this.state.hostClubs} />} />
            <Route path="/signup" render={()=> <Signup signupHandler={this.signupHandler} />} />
            <Route path="/movies/search" render={() => <MovieSearch addToClub={this.addToClubWatchlist} clubWatchlistSubmit={this.clubWatchlistSubmit} user={this.state.user} watchlistHandler={this.watchlistHandler} movieShow={this.goToMovieShow} />} />
            <Route path="/my-watchlist" render={() => <UserWatchlist user={this.state.user} movies={this.state.movies} userWatchlistId={this.state.userWatchlistId} userWatchlist={this.state.userWatchlist} deleteHandler={this.deleteFromUserWatchlist} />} />
            <Route path="/login" render={()=> <Login loginHandler={this.loginHandler} wrongCredentials={this.state.wrongCredentials} />} />
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About} />
            <Route path="/" render={()=> <Home user={this.state.user} loggedOut={this.state.userLoggedOut} />} />
          </Switch>
      </React.Fragment>
    );
  }
}


export default withRouter(App);