import React from 'react'

const AppContext = React.createContext({
  activeId: 1,
  updateActiveId: () => {},
  navItemsList: []
})

export default AppContext 

