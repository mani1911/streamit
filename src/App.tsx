import Router from "./router";
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePeer } from "./context/actions/peerActions";
import { RootState } from "./context/store";
import { Peer } from "peerjs";

function App() {
  const dispatch = useDispatch();  
  const peer = new Peer(useSelector((state:RootState) => state.peer.peerID));

  useEffect(() => {
    dispatch(updatePeer({peerID : uuidv4(), peer: peer}))
  }, [])

  return <>
      <Router/>
  </>
}

export default App
