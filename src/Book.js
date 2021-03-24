import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

export default function Book({info, setFocusedBook, setFocused, focused}) {
    const [thisBook, setThisBook] = useState([])
    const [thisImg, setThisImg] = useState('')
    // const [thisAuthor, setThisAuthor] = useState([])
    // const [clickedOn, setClickedOn] = useState([false]);
    // const [thisDescription, setThisDescription] = useState('')
    
    useEffect(()=> {
        async function APIcall (){
            let googleBook = await 
            // axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}*/&key=${process.env.REACT_APP_GOOGLE_KEY}*/`).then(res=>res.data);
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}`).then(res=>res.data);
            if (googleBook.totalItems === 0) return;
            // console.log(googleBook);
            let book = googleBook.items[0].volumeInfo;
            setThisImg(<img src={book.imageLinks.thumbnail} alt={book.title}/>)
            // setThisAuthor(book.authors);
            setThisBook(book)
            // setThisDescription(book.description)
        }
        APIcall()
    }, [info])

    const changeFocus = () => {
        setFocused(true)
        setFocusedBook(thisBook)
    }

    return (<>
        <div className="thumbnail" onClick={changeFocus}>{thisImg}</div>
        {/* {!clickedOn && <div className="book" onClick={()=>setClickedOn(!clickedOn)}>
            <div><b>Title</b> {thisBook.title}</div>
            <div><b>Author</b> {thisAuthor}</div>
            {thisImg}
            <div><b>Description</b>{thisDescription}</div>
        </div>} */}
        </>
    )
}
