import { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import Peer from 'peerjs';
import { updatePeer } from '../context/actions/peerActions';
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


var context;
var buf;
var source;


const AudioPage:FC<IPageProps> = ({peer}) => {
    const connectedPeers = useSelector((state:RootState) => state.peer.peersConnected);
    const dispatch = useDispatch();
    // const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
    dispatch(updatePeer(peer.id))
  
    function playByteArray(byteArray) {
      try {
        let arrayBuffer = new ArrayBuffer(byteArray.length);
        let bufferView = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteArray.length; i++) {
          bufferView[i] = byteArray[i];
        }
    
        context.decodeAudioData(arrayBuffer, function(buffer) {
            buf = buffer;
        }, function(error) {
          console.log("Error Occured decoding Audio : ", error)
        });
      }
      catch(e) {
        // console.log(e)
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
        // const aud = new Audio("audio.mp3");
        conn.on('open', () => {
          conn.send({type : peerActionType.PLAY, data : 0});
          // aud.play()
        })
      })

    }

    useEffect(() => {
      context = new AudioContext();
      peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
      });

      peer.on("connection", (conn) => {
  
        conn.on("data", (data : IPeerMessage) => {
          console.log("Data : ", data)
          if(data.type === peerActionType.PLAY) {

            if(source && source.stop) source.stop() 
            source = context.createBufferSource();
            source.buffer = buf;
            source.connect(context.destination);
            source.start(0);
          }
          else if(data.type === peerActionType.CONNECT) playByteArray(data.data)
        });
      })
    }, [peer]);

    
    return (
      <>
        <Button onClick = {() => sendStream("audio.mp3")}>Connect</Button>
        <Button onClick={() => peersPlay()} variant="contained">Play</Button>
      </>
    )
}


export default AudioPage;