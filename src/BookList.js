import {useState, useEffect} from 'react'
import Book from './Book';

export default function BookList({user}) {
    const [bookList, setBookList] = useState([])
    // const bookComponents = [];
    const header = {headers: {'Content-Type': "application/json"}}

    useEffect(()=>{
        async function call () {
            const books = await fetch('http://localhost:4000/' + user + '/books', header).then(res=>res.json());
            const temp = []
            console.log(books);
            for (let book of books){
                console.log(book.isbn);
                temp.push(<Book info={book.isbn}/>)
            }
            console.log(temp);
            setBookList(temp);
        }
        call();
    }, [])
    return (
        <div>
            {bookList}
        </div>
    )
}
