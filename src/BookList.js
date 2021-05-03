import {useState, useEffect} from 'react'
import Book from './Book';
import axios from 'axios'
import Focus from './Focus'

export default function BookList({user, newUpload}) {
    const [bookList, setBookList] = useState([]);
    const [focused, setFocused] = useState(null);
    const [focusedBook, setFocusedBook] = useState({});

    useEffect(()=>{
        async function call () {
            const books = await axios.get(`${process.env.REACT_APP_URL}/${user}/books`);
            const temp = [];
            for (let book of books.data){
                temp.push(<Book info={book.isbn} key={book.id} setFocusedBook={setFocusedBook} setFocused={setFocused} focused={focused}/>)
            }
            setBookList(temp);
        }
        call();
    }, [newUpload, user, focused]);
    
    return (
        <>
        {focused && <Focus focusedBook={focusedBook} user={user} focused={focused} setFocused={setFocused}/>}
        <div className="bookList">
            {bookList}
        </div>
        </>
    )
}
