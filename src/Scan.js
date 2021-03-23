import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import {useState} from 'react'

export default function Scan({ user, newUpload, setNewUpload }) {
  const [videoIsShown, setVideoIsShown] = useState(false)
  async function successfulRead(err, result) {
    if (result !== undefined && result.text.length === 13) {
      const isbn = result.text;
      if (!isRealISBN(isbn)) return
      let req = await fetch(
        process.env.REACT_APP_URL + "/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, book: isbn }),
        }
      ).then((res) =>{
        console.log(res)
        if(res.status === 400){
          window.alert('That book is probably already registered')
          return;
        }
        res.json();
      }) 
      setNewUpload(!newUpload)
    }
  }

  function isRealISBN(num){
    return num.split('').map((v,i)=> i%2!==0 ? +v*3 : +v).reduce((a,c)=>a+=c) % 10 === 0;
  }

  return (
    <div>
      <button onClick={()=> {setVideoIsShown(!videoIsShown)}}>SCAN</button>
      {videoIsShown && <BarcodeScannerComponent
        width={200}
        height={200}
        onUpdate={successfulRead}
      />}
    </div>
  );
}
