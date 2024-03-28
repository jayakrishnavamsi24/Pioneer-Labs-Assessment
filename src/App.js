import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import AppContext from './context/AppContext'
import Organization from './components/Organization';
import Trade from './components/Trade';
import Assets from './components/Assets';
import Wallet from './components/Wallet';
import History from './components/History';

let initialNavItemsList = [
  {
      id: 1,
      name: "Home",
      path: '/',
      isSelected: true
  },
  {
      id: 2,
      name: "Organization",
      path: '/organization',
      isSelected: false
  },
  {
      id: 3,
      name: "Assets",
      path: '/assets',
      isSelected: false
  },
  {
      id: 4,
      name: "Trade",
      path: '/trade',
      isSelected: false
  },
  {
      id: 5,
      name: "History",
      path: '/history',
      isSelected: false
  },
  {
      id: 6,
      name: "Wallet",
      path: '/wallet',
      isSelected: false
  }
]

class App extends Component  {
  state = {
    activeId: 1,
    navItemsList: initialNavItemsList
  }

  updateActiveId = (id) => {
    const {navItemsList} = this.state 
    const modifiedList = navItemsList.map(eachNavItem => ({
      ...eachNavItem,
      isSelected: eachNavItem.id === id
    }));
    this.setState({navItemsList: modifiedList, activeId: id})
  }

  render() {
    const {activeId, navItemsList} = this.state

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            activeId,
            updateActiveId: this.updateActiveId,
            navItemsList: navItemsList
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/organization" component={Organization} />
            <Route exact path="/trade" component={Trade} />
            <Route exact path="/assets" component={Assets} />
            <Route exact path="/history" component={History} />
            <Route exact path="/wallet" component={Wallet} />
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App;
