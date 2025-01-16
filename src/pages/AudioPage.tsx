// @ts-nocheck

import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Peer from 'peerjs';
import { updatePeer } from '../context/actions/peerActions';
import { useDispatch } from 'react-redux';

interface IPageProps {
  peer : Peer
}

var context : AudioContext;
var buf;
var source : AudioBufferSourceNode;

const AudioPage:FC<IPageProps> = ({peer}) => {
    const [peerid, setPeerid] = useState("");
    const dispatch = useDispatch();
    dispatch(updatePeer({peerID : peer.id}))
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
        let arrayBuffer = new ArrayBuffer(byteArray.length);
        let bufferView = new Uint8Array(arrayBuffer);
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
        console.log("here")
        source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);

        // source.start(0)
      }
      catch(e){
        // error handling
        console.log("Error getting audio : ", e)
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
        // aud.play()
      })
    }
  
    useEffect(() => {
      context = new AudioContext();
      peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
      });
    }, [peer]);
  
    
    return (
      <>
        <input value = {peerid} onChange={e => setPeerid(e.target.value)}></input>
        <Button onClick = {() => sendStream("audio.mp3")}>Connect</Button>
        <Button onClick={() => peersPlay()} variant="contained">Play</Button>
      </>
    )
}


export default AudioPage;