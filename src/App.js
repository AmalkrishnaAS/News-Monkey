
import './App.css';
import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=>{
  let apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const setprogress=(progress)=>{
    setProgress(progress)
  }
  
  
    return (
      <div>
        <Router>
         <Navbar />
         <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
     
         <Switch>
          <Route exact path="/science">
          <News setProgress={setProgress} apiKey={apiKey}   key="science" pageSize={18}  country='in' category='science'/>
          </Route>
          <Route exact path="/business">
          <News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={18}  country='in' category='business'/>
          </Route>
          <Route exact path="/">
          <News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={18}  country='in' category='general'/>
          </Route>
          <Route exact path="/entertainment">
          <News setProgress={setprogress} apiKey={apiKey}  key="entertainment" pageSize={18}  country='in' category='entertainment'/>
          </Route>
          <Route exact path="/health">
          <News setProgress={setprogress} apiKey={apiKey}  key="health" pageSize={18}  country='in' category='health'/>
          </Route>
          <Route exact path="/sports">
          <News setProgress={setprogress} apiKey={apiKey}  key="sports" pageSize={18}  country='in' category='sports'/>
          </Route>
          <Route exact path="/technology">
          <News setProgress={setprogress} apiKey={apiKey}  key="technology" pageSize={18}  country='in' category='technology'/>
          </Route>
        </Switch>
         </Router>
      </div>
    )
 
}
export default App