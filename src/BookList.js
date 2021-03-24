import {useState, useEffect} from 'react'
import Book from './Book';
import axios from 'axios'

export default function BookList({user, newUpload}) {
    const [bookList, setBookList] = useState([])
    const [focused, setFocused] = useState(null)
    const [focusedBook, setFocusedBook] = useState({})

    useEffect(()=>{
        async function call () {
            const books = await axios.get(`${process.env.REACT_APP_URL}/${user}/books`)
            const temp = []
            for (let book of books.data){
                temp.push(<Book info={book.isbn} key={book.id} setFocusedBook={setFocusedBook} setFocused={setFocused} focused={focused}/>)
            }
            setBookList(temp);
        }
        call();
    }, [newUpload, user, focused])
    
    useEffect(()=>{
        console.log(focused)
        console.log(focusedBook);
    }, [focusedBook, focused])

    return (
        <>
        {focused && 
        <div className="focus">
            <img src={focusedBook.imageLinks.thumbnail} alt="current book"/>
            <div><b>Title:</b> {focusedBook.title}</div>
            <div><b>Author:</b> {focusedBook.authors[0]}</div>
            <div><b>Description:</b> {focusedBook.description}
            </div>
        </div>
        }
        <div className="bookList">
            {bookList}
        </div>
        </>
    )
}
