import {useEffect, useState} from 'react'

export default function Book({info}) {
    const [thisBook, setThisBook] = useState([])
    const [thisImg, setThisImg] = useState('')
    const [thisAuthor, setThisAuthor] = useState([])
    
    useEffect(()=> {
        async function APIcall (){
            const googleBook = await 
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}&key=` + process.env.REACT_APP_GOOGLE_KEY)
            .then(res=> res.json())
            console.log(googleBook);
            console.log(info);
            let book = googleBook.items[0].volumeInfo;
            setThisImg(<img src={book.imageLinks.thumbnail} alt={book.title}/>)
            setThisAuthor(book.authors);
            setThisBook(book)
        }
        APIcall()
    }, [info])

    return (
        <>
        <div>Title {thisBook.title}</div>
        <div>Author {thisAuthor}</div>
        {thisImg}
        </>
    )
}
