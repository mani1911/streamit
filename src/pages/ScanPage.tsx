import { useDispatch, useSelector } from "react-redux";
import { QRCode } from "../components";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { RootState } from "../context/store";
import { Scanner } from '@yudiel/react-qr-scanner';
import { addPeersConnection } from "../context/actions/peerActions";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    textAlign : 'center',
    boxShadow: 24,
    p: 4,
  };

function ScanPage() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const peerID = useSelector((state:RootState) => state.peer.peerID);
    const dispatch = useDispatch();

    const [pid, setPid] = useState("");

    function addPeer() {
        if(pid !== "") dispatch(addPeersConnection(pid));
    }


    // console.log("Peer ID : ", peerID)


    useEffect(() => {
        if(peerID === null) navigate('/');
    }, [peerID]);
    return <div style = {{display: 'flex', flexDirection: 'column', height: '90vh', justifyContent: 'center',alignItems: 'center'}}>
        <QrCodeScannerIcon sx = {{'position' : 'fixed', 'top' : '5%', 'right' : '5%'}} onClick={handleOpen}></QrCodeScannerIcon>
        <Scanner styles={{container : {height : '250px'}}} onScan={(result) => setPid(result[0].rawValue)} />
        <div style={{marginTop : '30px'}}>
            <input value = {pid} onChange = {(e) => setPid(e.target.value)}></input>
            <Button onClick = {() => addPeer()}>Add Peer</Button>
        </div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx  = {style}>
                    <div style={{'textAlign' : 'center'}}>
                        <QRCode text = {peerID}/>
                        <Typography 
                            variant="caption"
                            style={{ display: "inline", whiteSpace: "normal", wordBreak: "break-word", color : "black" }}>
                            {peerID}
                        </Typography>
                    </div>
                </Box>

        </Modal>
    </div>
}

export default ScanPage;
