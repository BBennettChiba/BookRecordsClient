import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { useState } from "react";
import axios from "axios";

export default function Scan({ user, newUpload, setNewUpload }) {
  const [videoIsShown, setVideoIsShown] = useState(false);
  async function successfulRead(err, result) {
    if (result !== undefined && result.text.length === 13) {
      const isbn = result.text;
      if (!isRealISBN(isbn)) return;
      let req = await axios.post(`${process.env.REACT_APP_URL}/book`, {
        user,
        book: isbn,
      });
      if (req.status === 400){
        window.alert("That book is probably already registered");
        return;
      }
      setNewUpload(!newUpload);
    }
  }

  function isRealISBN(num) {
    if(!num.startsWith('978')) return false;
    return (
      num
        .split("")
        .map((v, i) => (i % 2 !== 0 ? +v * 3 : +v))
        .reduce((a, c) => (a += c)) %
        10 ===
      0
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setVideoIsShown(!videoIsShown);
        }}
      >
        SCAN
      </button>
      {videoIsShown && (
        <BarcodeScannerComponent
          width={200}
          height={200}
          onUpdate={successfulRead}
        />
      )}
    </div>
  );
}
