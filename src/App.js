import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Post from './components/Post'
import SinglePost from './components/SinglePost'
import Projects from './components/Projects'
import Contact from './components/Contact'
import PageNotFound from './components/PageNotFound'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={About} path="/about" />
        <Route component={SinglePost} path="/post/:slug" />
        <Route component={Post} path="/post" />
        <Route component={Projects} path="/project" />
        <Route component={Contact} path="/contact" />
        <Route component={PageNotFound} path="/*" />
      </Switch>
    </Router>
  )
}

export default App
