import { useSelector } from "react-redux";
import { QRCode } from "../components";
import { Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { RootState } from "../context/store";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    // bgcolor: 'background.paper',
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
    // console.log("Peer ID : ", peerID)


    useEffect(() => {
        if(peerID === null) navigate('/');
    }, [peerID]);
    return <>
        <QrCodeScannerIcon sx = {{'position' : 'fixed', 'top' : '5%', 'right' : '5%'}} onClick={handleOpen}></QrCodeScannerIcon>
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
                            style={{ display: "inline", whiteSpace: "normal", wordBreak: "break-word"  }}>
                            {peerID}
                        </Typography>
                    </div>
                </Box>

</Modal>
    </>
}

export default ScanPage;