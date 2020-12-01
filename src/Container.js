import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Book from './book/Book'
import Home from './home/Home'
import Navigation from './navigation/Navigation'

export default function Container() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
      </Switch>
    </Router>
  )
}
