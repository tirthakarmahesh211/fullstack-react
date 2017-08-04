import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopBar from './TopBar'
import PrivateRoute from './PrivateRoute'
import AlbumsContainer from './AlbumsContainer'
import Login from './Login'
import Logout from './Logout'

import '../styles/App.css'

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />

      <PrivateRoute path='/albums' component={AlbumsContainer} />
      <Route exact path='/' render={() => (
        <Redirect

          to='/albums'
        />
      )} />
    </div>
  </div>
)

export default App
