import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Reservations from './routes/reservations/Reservations'
import Book from './routes/book/Book'
import Navigation from './navigation/Navigation'

export default function Container() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Reservations />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
      </Switch>
    </Router>
  )
}
