
import './App.css';
import { Header } from './components/Layouts/Header';
import { Footer } from './components/Layouts/Footer';

import { HomePage } from './pages/Home/HomePage';

import { AllRoutes } from './routes/AllRoutes';
import {useState} from "react";


function App() {

  const[endPointState,setEndPointState]=useState("")
 
  return (
    <div className="App">
      <Header endPointState={endPointState} setEndPointState={setEndPointState}/>
      <AllRoutes endPointState={endPointState} setEndPointState={setEndPointState}/>
      {/* <HomePage /> */}
      <Footer />
    </div>

  );
}


export default App