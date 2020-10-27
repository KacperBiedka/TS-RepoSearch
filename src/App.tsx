import React, { useEffect } from 'react';
import { updateSearchError } from "./actions/index";  
import { useDispatch } from "react-redux";
import './App.css';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSearchError('empty'));
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
