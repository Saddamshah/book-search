import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Home = () => {

    const [book, setBook] = useState("");
    const [result, setResult] = useState([])

    const handleChange = event => {
        let bookValue = event.target.value;
       
        setBook(bookValue)
    }

    const handleSubmit =  event => {
        event.preventDefault();

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`).then(data => {
            console.log(data.data.items)
            setResult(data.data.items)
            setBook("")
        })
    }

    return (
        <div className="container py-4">
            <h1 className="text-center text-white my-2 heading">Search For Books</h1>
            <div className="row">
                <div className="col-md-8 mx-auto ">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3 d-flex heading">
                            <input 
                                type="text"
                                onChange={handleChange}
                                className="form-control"
                                value={book}
                                placeholder="Search for Books"
                            />
                            <button 
                                type="submit"
                                className="btn btn-danger px-4"    
                            ><span>Search!</span>
                            </button>
                        </div>    
                    </form>
                </div>
            </div>
            <div className="row my-5">
                {result.map((book, index) => (
                    <>
                     {    
                        book.volumeInfo.imageLinks ? (
                            <div className="text-white  mx-auto " style={{maxWidth: "180px"}}>
                                   <div className="mx-2">
                                        {!book.volumeInfo.authors ? (
                                            <p className="lead text-center">{book.volumeInfo.authors}</p>
                                        ) :  <p className="lead text-center">{book.volumeInfo.authors[0]}</p>}
                                        
                                        <img src={book.volumeInfo.imageLinks.thumbnail} key={index} alt={book.title} width="100%"/>
                                        <h3>{book.title}</h3>
                                        <a href={book.volumeInfo.infoLink} 
                                        target="_blank"
                                        className="btn btn-primary w-100 mb-5"
                                        >Read Know</a>
                                   </div>
                            </div>
                        ) : ("")
                    }
                    </>
                ))}
            </div>
        </div>
    )
}

export default Home