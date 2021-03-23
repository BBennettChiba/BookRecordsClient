import { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

export default function Scan({ user }) {
  const [data, setData] = useState(0);

  async function addBook() {
    const book = document.getElementById("isbn").value;
    const req = await fetch(
      "https://book-recorder-backend.herokuapp.com/book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, book }),
      }
    ).then((res) => res.json());
    console.log(req);
  }
  async function successfulRead(err, result) {
    if (result !== undefined && result.text.length === 13) {
      const isbn = result.text;
      console.log(isbn);
      const googleReq = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(res=>res.json())
      if (googleReq.data.totalItems === 0) return;
      let req = await fetch(
        "https://book-recorder-backend.herokuapp.com/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, book: isbn }),
        }
      ).then((res) => res.json());
      console.log(req);
    }
  }

  return (
    <div>
      <input type="text" id="isbn"></input>ISBN
      <button onClick={addBook}>SCAN</button>
      <BarcodeScannerComponent
        width={200}
        height={200}
        onUpdate={successfulRead}
      />
      <p>{data}</p>
    </div>
  );
}
