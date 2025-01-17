// // @ts-nocheck

import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Peer from 'peerjs';
import { addPeersConnection, updatePeer } from '../context/actions/peerActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../context/store';

enum peerActionType {
  PLAY = "play",
  CONNECT = "connect",
}

interface IPageProps {
  peer : Peer
}

interface IPeerMessage {
  type : peerActionType,
  data : any
}

var context : AudioContext;
var buf;
var source : AudioBufferSourceNode;

const AudioPage:FC<IPageProps> = ({peer}) => {
    const [peerid, setPeerid] = useState("");
    const connectedPeers = useSelector((state:RootState) => state.peer.peersConnected);
    const dispatch = useDispatch();
    dispatch(updatePeer(peer.id))

    peer.on("connection", (conn) => {
  
      conn.on("data", (data : IPeerMessage) => {
        console.log("Data : ", data)
        if(data.type === peerActionType.PLAY) {
          source.start(data.data)
        }
        else if(data.type === peerActionType.CONNECT) playByteArray(data.data)
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
      catch(e) {play
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
      try {
        connectedPeers.forEach(pid => {
          getAudioStream(audioFilePath).then((buf) => {
            var conn = peer.connect(pid);
              conn.on('open', () => {
                conn.send({type: peerActionType.CONNECT, data: buf});
              })
          })
          .catch(e => {
            console.log("Error Occured sending stream : ", e)
            return
          })
        })
      }
      catch(e) {
        console.log("Error Occured sending stream : ", e)
      }

    }
  
    function peersPlay() {
      connectedPeers.forEach(pid => {
        var conn = peer.connect(pid);
        const aud = new Audio("audio.mp3");
        conn.on('open', () => {
          conn.send({type : peerActionType.PLAY, data : 0});
          // aud.play()
        })
      })

    }

    function addPeer() {
      dispatch(addPeersConnection(peerid));
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
        <Button onClick = {() => addPeer()}>Add Peer</Button>
        <Button onClick = {() => sendStream("audio.mp3")}>Connect</Button>
        <Button onClick={() => peersPlay()} variant="contained">Play</Button>
      </>
    )
}


export default AudioPage;