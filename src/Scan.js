import { useState} from "react";
import axios from "axios";
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

export default function Scan({ user, newUpload, setNewUpload }) {
  const [videoIsShown, setVideoIsShown] = useState(false);
  const [ data, setData ] = useState(null);


  async function successfulRead(err, result) {
    if(result === undefined) return 
    if (result !== undefined && result.text.length === 13) {
      const isbn = result.text;
      if (!isRealISBN(isbn)) return;
      let books = await axios.get(`${process.env.REACT_APP_URL}/${user}/books`)
      if (books.data.map(a=>a.isbn).includes(isbn)) {
        window.alert('book already registered');
        return;
      }
      await axios.post(`${process.env.REACT_APP_URL}/book`, {
        user,
        book: isbn,
      })
      setNewUpload(!newUpload);
      setVideoIsShown(false)
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
    <div className="scan">
      <button
        onClick={() => {
          setVideoIsShown(!videoIsShown);
        }}
      >
        SCAN
      </button>
      {videoIsShown && <BarcodeScannerComponent
        width={200}
        height={200}
        onUpdate={successfulRead}
      />}
    </div>
  );
}
