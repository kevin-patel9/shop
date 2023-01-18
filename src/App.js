import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { PieChart } from "./components/piechart";

 const App = () => {
    const [query, setQuery] = useState("");
    let [apiData, setApiData] = useState();
    const [readMore, setReadeMore] = useState(false);
    const [showPie, setShowPie] = useState(false);
    const [category, setCategory] = useState();
    const [pieCharts, setPieCharts] = useState({
      labels: apiData && apiData.map((data) => data.category),
      datasets: [
        {
          label: "Category In Catalogue",
          data: apiData && apiData.map((data) => data.rating.count),
          backgroundColor: ["green"],
        },
      ],
    });

  let menClothing = apiData && apiData.filter((data)=> data.category == `men's clothing`)

  let menTotal = 0

  menClothing = menClothing && menClothing.forEach((item)=>{
    menTotal += item.rating.count
  })

  let womenClothing = apiData && apiData.filter((data)=> data.category == `women's clothing`)

  let womenTotal = 0;
  womenClothing = womenClothing && womenClothing.forEach((item)=>{
    womenTotal += item.rating.count
  })

  let jewelTotal = 0

  let jewelery = apiData && apiData.filter((data)=> data.category == `jewelery`)

  jewelery = jewelery && jewelery.forEach((item)=>{
    jewelTotal += item.rating.count
  })

  let elecTotal = 0;

  let electronics = apiData && apiData.filter((data)=> data.category == `electronics`)

  electronics = electronics && electronics.forEach((item)=>{
    elecTotal += item.rating.count
  })

  useEffect(()=> {
    setPieCharts({
      labels: apiData && [...new Set(apiData.map((data) => data.category))],
      datasets: [
        {
          label: "Category Include",
          data: [menTotal, jewelTotal, elecTotal, womenTotal],
          backgroundColor: ["green", "blue", "purple", "coral"],
        },
      ],
    })
  }, [apiData])

  const selectOption = (e) => {
    setCategory(e.target.value);
  };

  const read = () => {
    setReadeMore(() => !readMore);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setApiData(res.data))
      .catch(() => console.log("will start"));

  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <select className="select" onClickCapture={selectOption}>
                <option>all</option>
                <option>men's clothing</option>
                <option>jewelery</option>
                <option>electronics</option>
                <option>women's clothing</option>
              </select>
              <input type="text" className="input-value" onChange={e => setQuery(e.target.value)} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showPie && <div className="pie-graph" >
        <PieChart chartData={pieCharts} />
        <button className="close-btn" onClick={()=> setShowPie(false)}>X</button>
      </div>}
        <button className="pie-button" onClick={() => setShowPie(!showPie)}>ANALYZE</button>

      <div className="product-container">
        {!apiData ? (
          <h2 className="loading">Loading....</h2>
        ) : ( apiData &&
          apiData.filter((val)=>{

            if(query == ""){
                return val
              }else if (val.title.toLowerCase().includes(query.toLowerCase())){
                return val
              }

          }).filter((val)=>{
            
            if (category == "all"){
              return val
            }
            else if (category == undefined){
              return val
            }
            else{
              return val.category == category
            }
          }).map((data) => {
            return (
              <div key={data.id} className="all-products">
                <div className="img-container">
                  <img src={data.image} alt="products" />
                </div>
                <div className="product-category">{data.category}</div>
                <h5>{data.title}</h5>
                <div className="description">
                  {readMore
                    ? data.description
                    : data.description.substr(0, 150)}
                  <button onClick={read}>
                    {!readMore ? "Read More..." : "...Read Less"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
