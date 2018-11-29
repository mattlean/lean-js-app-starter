// @flow
import React from 'react'

import FlowLogo from '../assets/imgs/flow.png'
import JestLogo from '../assets/imgs/jest.png'
import Page from './Page'
import ReactLogo from '../assets/imgs/react.png'
import ReactRouterLogo from '../assets/imgs/react-router.png'
import ReduxLogo from '../assets/imgs/redux.png'
import SassLogo from '../assets/imgs/sass.png'

const Home = () => <Page>
  <div id="logos">
    <img src={ReactLogo} alt="React" title="React" />
    <img src={ReduxLogo} alt="Redux" title="Redux" />
    <img src={ReactRouterLogo} alt="React Router" title="React Router" />
    <img src={FlowLogo} alt="Flow" title="Flow" />
    <img src={JestLogo} alt="Jest" title="Jest" />
    <img src={SassLogo} alt="Sass" title="Sass" />
  </div>
  <p>Get started by editing the files in <code>src/</code>!</p>
</Page>

export default Home
