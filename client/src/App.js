import { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css"
import ReactPaginate from 'react-paginate'

export const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 6;
    const pageVisited = pageNumber * usersPerPage;

    const displayUsers = data &&
          data 
            .slice(pageVisited, pageVisited + usersPerPage)
            .map((movie,i) => {
              return(
                <div key={i} className="movieContainer">
                    <div className="imgContainer"><img src={movie.poster} alt={movie.title} /></div>
                    <hr />
                    <div className="detailContainer">
                      <h4>Title: <i>{movie.title}</i></h4>
                      <h5>rating: {movie.imdb.rating}</h5>
                      <h5 className="language">{movie.languages 
                      && movie?.languages?.map(lang =>{
                        return (
                          <div>
                            {lang},
                          </div>
                        )
                      })}</h5>
                    </div>
                </div>
              )
            })

  useEffect(()=> {
    axios.get('http://localhost:9000/movies')
      .then(res => setData(res.data))

    setUser(data.slice(0, data.length))
  }, [data.length])

  const pageCount = Math.ceil(user.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

  return (
    <div>
      <div className="container">
        {displayUsers}
      </div>
       <div className='paginationContain'>
          <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtn"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledLinkClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
          />
        </div>
    </div>
  )
}