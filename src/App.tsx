import React from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux'
import logo from './logo.svg';
import * as dom_action from './action';
import * as popup from './popup';
import store from './store'
import {dataSlice,modeSlice} from './slice'
import './App.css';
function Nav(props:any){
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Messier marathoner</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={(e)=>{
                dispatch(dataSlice.actions.reset(undefined))
              }}>Reset</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                목록 선택
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" onClick={(e)=>{
                  dispatch(modeSlice.actions.setmode('no_view'))
                }}>관측 못한 천체들</a>
                <a className="dropdown-item" onClick={(e)=>{
                  dispatch(modeSlice.actions.setmode('view'))
                }}>관측한 천체들</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
  );
}
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Nav></Nav>
      <dom_action.MakeTable data_width={5}></dom_action.MakeTable>
      <popup.Popup></popup.Popup>
      </Provider>
    </div>
  );
}

export default App;
