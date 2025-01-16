import Router from "./router";
import './App.css'
// import { v4 as uuidv4 } from 'uuid';
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updatePeer } from "./context/actions/peerActions";
// import Peer from "peerjs";
// import { RootState } from "./context/store";
// import { RootState } from "./context/store";
// import { Peer } from "peerjs";

function App() {
  // const dispatch = useDispatch();  
  // const pid = uuidv4().replace(/-/g, "");
  // const peer = new Peer(pid);
  // useEffect(() => {
  //   console.log("here")
  //   dispatch(updatePeer({peerID : pid}))
  // }, [])

  return <>
      <Router/>
  </>
}

export default App
