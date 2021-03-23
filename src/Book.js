import {useEffect, useState} from 'react'

export default function Book({info}) {
    const [thisBook, setThisBook] = useState([])
    const [thisImg, setThisImg] = useState('')
    const [thisAuthor, setThisAuthor] = useState([])
    
    useEffect(()=> {
        async function APIcall (){
            console.log(info);
            const googleBook = await 
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${info}`)
            .then(res=> res.json())
            let book = googleBook.items[0].volumeInfo;
            setThisImg(<img src={book.imageLinks.thumbnail} alt={book.title}/>)
            setThisAuthor(book.authors);
            console.log(book);
            setThisBook(book)
        }
        APIcall()
    }, [])

    return (
        <>
        <div>Title {thisBook.title}</div>
        <div>Author {thisAuthor}</div>
        {thisImg}
        </>
    )
}
