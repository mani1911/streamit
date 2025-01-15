import { useEffect, useState, useRef } from 'react';
import './App.css'
import { Peer } from "peerjs";
// import { io } from 'socket.io-client';




function App() {
  const [peerid, setPeerid] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const peer = new Peer();
  var context;
  var buf;
  const byteArray = []

  function init() {
    // if (!window.AudioContext) {
    // if (!window.webkitAudioContext) {
    //     alert("Your browser does not support any AudioContext and cannot play back this audio.");
    //     return;
    // }
    //     window.AudioContext = window.webkitAudioContext;
    // }

    context = new AudioContext();
}



  peer.on("connection", (conn) => {

    conn.on("data", (data) => {
      byteArray.push(data)
      if(!isPlaying) playByteArray()
    });

    // if(byteArray.length > 500) {
    //   conn.send('Start');
    // }
  })

  function playByteArray() {
    // console.log("Coming here : ", buf)
    try {
      var arrayBuffer = new ArrayBuffer(byteArray.length);
      var bufferView = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteArray.length; i++) {
        bufferView[i] = byteArray[i];
      }
  
      context.decodeAudioData(arrayBuffer, function(buffer) {
          buf = buffer;
          play();
      });
    }
    catch(e) {
      // console.log(e)
    }

  }

  function play() {
    try {
      var source = context.createBufferSource();
      source.buffer = buf;
      // Connect to the final output node (the speakers
      source.connect(context.destination);
      // Play immediately
      source.start(0);
    }
    catch(e){
      // error handling
    }

  }

  async function getAudioStream(audioFilePath) {
    // const audio = new Audio(audioFilePath);
    // audio.play()
    const response = await fetch(audioFilePath, {'mode': 'cors'}); // Fetch the audio file
    const buffer = await response.arrayBuffer(); // Convert to ArrayBuffer

    console.log(buffer)
    const view = new Uint8Array(buffer);

    return view;
  }


  function sendStream(audioFilePath) { 
    getAudioStream(audioFilePath).then((buf) => {

      console.log("coming here")
      var conn = peer.connect(peerid);
      for (let i = 0; i < buf.length; i++) {
        conn.on('open', () => {

          conn.send(buf[i]);
        })
      }
    })
    .catch(e => {
      console.log("Error Occured : ", e)
      return
    })
  }


  useEffect(() => {
    init();
    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });
  }, [])

  
  return (
    <>
      <input value = {peerid} onChange={e => setPeerid(e.target.value)}></input>
      <button onClick = {() => sendStream("audio.mp3")}>Connect</button>
    </>
  )
}

export default App
