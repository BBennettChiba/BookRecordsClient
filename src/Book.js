import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

export default function Book({info}) {
    const [thisBook, setThisBook] = useState([])
    const [thisImg, setThisImg] = useState('')
    const [thisAuthor, setThisAuthor] = useState([])
    
    useEffect(()=> {
        async function APIcall (){
            let googleBook = await 
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res=>res.data);
            if (googleBook.totalItems === 0) return;
            console.log(googleBook);
            let book = googleBook.items[0].volumeInfo;
            setThisImg(<img src={book.imageLinks.thumbnail} alt={book.title}/>)
            setThisAuthor(book.authors);
            setThisBook(book)
        }
        APIcall()
    }, [info])

    return (
        <div className="book">
        <div><b>Title</b> {thisBook.title}</div>
        <div><b>Author</b> {thisAuthor}</div>
        {thisImg}
        </div>
    )
}
