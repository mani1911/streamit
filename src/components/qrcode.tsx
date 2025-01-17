import React, { useEffect, useRef } from "react";
import qrcode from "qrcode-generator";

const QRCode: React.FC<{ text: string }> = ({ text }) => {
    const qrRef = useRef<HTMLDivElement>(null);
    // console.log('Text : ', text)
    useEffect(() => {
        const typeNumber = 4;
        const errorCorrectionLevel = "L";
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(text);
        qr.make();

        if (qrRef.current) {
            qrRef.current.innerHTML = qr.createImgTag(5, 0);
        }
    }, [text]);

    return <div style = {{'width' : '100%', 'height' : '100%'}} ref={qrRef}></div>;
};

export default QRCode;