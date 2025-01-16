// @ts-nocheck

import { useSelector } from "react-redux";
import { QRCode } from "../components";

function ScanPage() {
    const peerID = useSelector(state => state.peer.peerID);
    // console.log("Peer ID : ", peerID)
    return <>
        <QRCode text = {peerID}/>
        <p>Your ID : {peerID}</p>
    </>
}

export default ScanPage;