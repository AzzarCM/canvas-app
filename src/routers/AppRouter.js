import React from 'react'
import { AuthRouter } from "./AuthRouter"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
export const AppRouter = () => {
    return (
       <Router>
           <div>
               <Switch>
                   <Route
                        path="/auth"
                        component={ AuthRouter }
                   />

                   <Redirect to="/auth/login"/>
               </Switch>

           </div>
       </Router>
    )
}
