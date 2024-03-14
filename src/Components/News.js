import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
// document.title = `${capitalLetter(props.category)} - NewsMonkey`;

    const capitalLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bd0bf1ce93004c95a41fd34fda9d823c&page=${props.page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    //console.log(parseData);
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
    
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, page+1);

  const fetchMoreData = async() =>{
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bd0bf1ce93004c95a41fd34fda9d823c&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    //console.log(parseData);
    
      setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
      setLoading(false)
  }


  // const handlePrev =async() => {
  //   setPage(page - 1 );
  //   updateNews();
  // }

  // const handleNext = async() => {
  //   setPage(page + 1 );
  //   updateNews();
  // }

    return (
      <>
        <h1 className="text-center" style={{marginTop: "5%" }}>NewsMonkey Top headlines of {capitalLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row text-center">
            {/*!state.loading &&*/ articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title/*?element.title.slice(0,45):""*/} date={element.publishedAt} descriptions={element.description ? element.description.slice(0, 88) : ""} urlImage={element.urlToImage} newsUrl={element.url} author={element.author} source={element.source.name} />
              </div>
            })
            }
          </div>
          </div>
          
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}

      </>
    );
}

News.defaultProps = {
    pageSize: 5,
    country: 'in',
    category: "general",
  }
News.propTypes = {
    pageSize : PropTypes.number,
    country : PropTypes.string,
    category : PropTypes.string ,
}
export default News;
