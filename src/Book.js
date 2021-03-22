import {useEffect, useState} from 'react'

export default function Book({info}) {
    const [thisBook, setThisBook] = useState({})
    useEffect(()=> {
        async function APIcall (){
            console.log(info);
            const googleBook = await 
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}`)//&key=AIzaSyDVFsYvujIZ4F2up2VWFu5MXvahYaeRUXA
            .then(res=> res.json())
            let book = googleBook.items[0].volumeInfo;
            console.log(book);
            setThisBook(book)
        }
        APIcall()
    }, [])

    return (
        <div>
            {thisBook}
        </div>
    )
}
