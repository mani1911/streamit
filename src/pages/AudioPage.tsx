import { FC, useEffect } from 'react';
import Peer from 'peerjs';
import { addSongtoQueue, updatePeer } from '../context/actions/peerActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { SearchPage } from '../components';

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


var context;
var buf;
var source;


const AudioPage:FC<IPageProps> = ({peer}) => {
    const connectedPeers = useSelector((state:RootState) => state.peer.peersConnected);
    const audio = new Audio();
    const dispatch = useDispatch();

    // function playByteArray(byteArray) {
    //   try {

    //     console.log("bbyte : ", byteArray)
    //     let arrayBuffer = new ArrayBuffer(byteArray.length);
    //     let bufferView = new Uint8Array(arrayBuffer);
    //     for (var i = 0; i < byteArray.length; i++) {
    //       bufferView[i] = byteArray[i];
    //     }
    
    //     context.decodeAudioData(arrayBuffer, function(buffer) {
    //         buf = buffer;
    //     }, function(error) {
    //       console.log("Error Occured decoding Audio : ", error)
    //     });
    //   }
    //   catch(e) {
    //     // console.log(e)
    //   }
  
    // }
  
    async function getAudioStream(audioFilePath) {
      const response = await fetch(audioFilePath, {'mode': 'cors'}); 
      const buffer = await response.arrayBuffer(); 
      const view = new Uint8Array(buffer);
  
      return view;
    }
  
  
    function sendStream(audioFilePath) { 

      // const aud = new Audio(audioFilePath);
      // aud.play();
      try {
        connectedPeers.forEach(pid => {
          var conn = peer.connect(pid);
          conn.on('open', () => {
            conn.send({ type: peerActionType.CONNECT, data: audioFilePath });
          });
        });
      } catch (e) {
        console.log("Error Occurred sending stream:", e);
      }
    }
  
    function peersPlay() {


      var delay = connectedPeers.length * 5;
      connectedPeers.forEach(pid => {
        var conn = peer.connect(pid);
        // const aud = new Audio("audio.mp3");
        conn.on('open', () => {
          conn.send({type : peerActionType.PLAY, data : delay});
          // aud.play()
        })
        delay -= 5;
      })
      

    }

    useEffect(() => {
      context = new AudioContext();
      peer.on('open', (id) => {
        dispatch(updatePeer(id))
        console.log('My peer ID is: ' + id);
      });

      peer.on("connection", (conn) => {
  
        conn.on("data", (data : IPeerMessage) => {
          console.log("Data : ", data)
          if(data.type === peerActionType.PLAY) {
            

            audio.play();
            // const songQueue = useSelector((state: RootState) => state.peer.queue);
            // console.log(songQueue);
            // if(source && source.stop) source.stop() 
            // source = context.createBufferSource();
            // source.buffer = buf;
            // source.connect(context.destination);
            // source.start(data.data);

            
          }
          else if(data.type === peerActionType.CONNECT) {
            audio.src = data.data;
            dispatch(addSongtoQueue(data.data));
          }
        });
      })
    }, []);


    return (
      <>
        <SearchPage sendStream = {sendStream} play = {peersPlay}/>
      </>
    )
}


export default AudioPage;