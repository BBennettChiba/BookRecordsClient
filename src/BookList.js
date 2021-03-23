import {useState, useEffect} from 'react'
import Book from './Book';
import axios from 'axios'

export default function BookList({user, newUpload}) {
    const [bookList, setBookList] = useState([])
    
    useEffect(()=>{
        async function call () {
            const books = await axios.get(`${process.env.REACT_APP_URL}/${user}/books`)
            const temp = []
            for (let book of books.data){
                temp.push(<Book info={book.isbn} key={book.id}/>)
            }
            setBookList(temp);
        }
        call();
    }, [newUpload, user])
    return (
        <div>
            {bookList}
        </div>
    )
}
