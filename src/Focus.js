import axios from "axios";
import {useState} from "react";

export default function Focus({focusedBook, user, setFocused, focused}) {
    const [showFullDes, setShowFullDes] = useState(null);
    const deleteThisBook = async ()=> {
        try {
            console.log(focusedBook);
            await axios.delete(`${process.env.REACT_APP_URL}/${user}/book`, {data: {user, book:focusedBook.industryIdentifiers[1].identifier}});
            setFocused(!focused);
        } catch(err){
            console.log(err);
        }
    }
  return (
    <div className="focus">
      <img src={focusedBook.imageLinks.thumbnail} alt="current book" />
      <div>
        <b>Title:</b> {focusedBook.title}
      </div>
      <div>
        <b>Author:</b> {focusedBook.authors[0]}
      </div>
      {!showFullDes && <div>
        <b>Description:</b> <span onClick={()=>{setShowFullDes(!showFullDes)}}>{focusedBook.description.substring(0,20) + '...'}</span>
        </div>}
        {showFullDes && <div>
        <b>Description:</b> <span onClick={()=>{setShowFullDes(!showFullDes)}}>{focusedBook.description}</span>
      </div>}
      <div>
          <b>Published Date: </b> {focusedBook.publishedDate}
      </div>
      <div>
          <b>Publisher: </b> {focusedBook.publisher}
      </div>
      <div>
          <b>No of Pages: </b> {focusedBook.pageCount}
      </div>
      <button onClick={deleteThisBook}>DELETE</button>
    </div>
  );
}
