// //  @ts-nocheck

import { FC, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import Button from '@mui/material/Button';
import { RootState } from '../context/store';

const AudioPage:FC = () => {
    const [peerid, setPeerid] = useState("");
    // const peer = new Peer(useSelector(state => state.peer.peerID));
    // console.log(useSelector(state => state.peer.peerID))

    const peer = useSelector((state:RootState) => state.peer.peer)
    var context;
    var buf;
    var source;

    // const test = useSelector(state => suseSelectortate.peer.peerID)
  
    peer.on("connection", (conn) => {
  
      conn.on("data", (data) => {
        console.log("Data : ", data)
        if(data === "play") {
          source.start(0)
        }
        else if(data instanceof Uint8Array) playByteArray(data)
      });
    })
  
    function playByteArray(byteArray) {
      try {
        var arrayBuffer = new ArrayBuffer(byteArray.length);
        var bufferView = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteArray.length; i++) {
          bufferView[i] = byteArray[i];
        }
    
        context.decodeAudioData(arrayBuffer, function(buffer) {
            buf = buffer;
            play();
        }, function(error) {
          console.log("Error Occured decoding Audio : ", error)
        });
      }
      catch(e) {
        // console.log(e)
      }
  
    }
  
    function play() {
      try {
        source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
      }
      catch(e){
        // error handling
      }
  
    }
  
    async function getAudioStream(audioFilePath) {
      const response = await fetch(audioFilePath, {'mode': 'cors'}); // Fetch the audio file
      const buffer = await response.arrayBuffer(); // Convert to ArrayBuffer
      const view = new Uint8Array(buffer);
  
      return view;
    }
  
  
    function sendStream(audioFilePath) { 
      getAudioStream(audioFilePath).then((buf) => {
        var conn = peer.connect(peerid);
          conn.on('open', () => {
  
            conn.send(buf);
          })
      })
      .catch(e => {
        console.log("Error Occured : ", e)
        return
      })
    }
  
    function peersPlay() {
      var conn = peer.connect(peerid);
      const aud = new Audio("audio.mp3");
      conn.on('open', () => {
        conn.send("play");
        aud.play()
      })
    }
  
  
    useEffect(() => {
      context = new AudioContext();
      // console.log('My Peer ID is : ', peer.id)
      peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
      });
    }, [])
  
    
    return (
      <>
        <input value = {peerid} onChange={e => setPeerid(e.target.value)}></input>
        <Button onClick = {() => sendStream("audio.mp3")}>Connect</Button>
        <Button onClick={() => peersPlay()} variant="contained">Play</Button>
      </>
    )
}


export default AudioPage;