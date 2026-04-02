import React from 'react'
import FaceExpression from './features/expressions/components/Faceexpression'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import './features/shared/global.scss'
import { Authprovider } from './features/auth/states/auth.context'
import { SongProvider } from './features/home/song.context'

const App = () => {
  return (
    <Authprovider>
      <SongProvider> 
         <RouterProvider router={routes} />
      </SongProvider>
     
    </Authprovider>
    
  )
}

export default App