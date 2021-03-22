import React from 'react'

export default function Scan({user}) {
    async function addBook(){
        const book = document.getElementById('isbn').value;
        const req = await fetch('http://localhost:4000/book', {method: "POST", 
        headers: {'Content-Type': "application/json"}, 
        body: JSON.stringify({user, book})}).then(res=>res.json())
        console.log(req);
    }
    return (
        <div>
            <input type='text' id='isbn'></input>ISBN
            <button onClick={addBook}>SCAN</button>
        </div>
    )
}
