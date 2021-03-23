import {useState, useEffect} from 'react'
import Book from './Book';

export default function BookList({user, newUpload}) {
    const [bookList, setBookList] = useState([])
    
    useEffect(()=>{
        const header = {headers: {'Content-Type': "application/json"}}
        async function call () {
            const books = await fetch(process.env.REACT_APP_URL + '/' + user + '/books', header).then(res=>res.json());
            const temp = []
            for (let book of books){
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
