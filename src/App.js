import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'moment/locale/nb'

import { useSession } from '@vtfk/react-msal'
import { loginRequest } from './config/auth'

import * as Sentry from '@sentry/react'

import { Home } from './pages/Home'
import { ActivityLog } from './pages/ActivityLog'
import { Classes } from './pages/Classes'
import { Class } from './pages/Class'
import { Students } from './pages/Students'
import { Student } from './pages/Student'
import { Statistics } from './pages/Statistics'
import { Help } from './pages/Help'
import { PageNotFound } from './pages/PageNotFound'

import { ROUTES } from './config/constants'

const AppContent = () => {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path={`/${ROUTES.activityLog}`} component={ActivityLog} />
          <Route exact path={`/${ROUTES.classes}`} component={Classes} />
          <Route exact path={`/${ROUTES.classes}/:id`} component={Class} />
          <Route exact path={`/${ROUTES.students}`} component={Students} />
          <Route exact path={`/${ROUTES.students}/:id`} component={Student} />
          <Route exact path={`/${ROUTES.students}/:id/:docId`} component={Student} />
          <Route exact path={`/${ROUTES.statistics}`} component={Statistics} />
          <Route exact path={`/${ROUTES.help}`} component={Help} />

          <Route exact path='*' component={PageNotFound} />
        </Switch>

      </div>
    </Router>
  )
}

function App () {
  const { isAuthenticated, login, authStatus, user } = useSession()

  if (['pending'].includes(authStatus)) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    login(loginRequest)
    return <></>
  }

  if (isAuthenticated && authStatus === 'finished') {
    Sentry.setUser({
      email: user.userPrincipalName || undefined,
      username: user.onPremisesSamAccountName || undefined,
      ip_address: '{{auto}}'
    })

    return <AppContent />
  } else if (process.env.REACT_APP_IS_MOCK) {
    return <></>
  }
}

export default App
