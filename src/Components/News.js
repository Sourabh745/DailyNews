import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async (newPage = 1) => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bd0bf1ce93004c95a41fd34fda9d823c&page=${newPage}&pageSize=${props.pageSize}`;
      setLoading(true);
      let response = await fetch(url);

      if (response.status === 429) {
        // Handle rate limit exceeded
        console.error('Rate limit exceeded. Try again later.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      props.setProgress(30);
      let parseData = await response.json();
      props.setProgress(70);
      setArticles((prevArticles) => newPage === 1 ? parseData.articles : [...prevArticles, ...parseData.articles]);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    updateNews(page);
    // eslint-disable-next-line 
  }, [page]);

  const fetchMoreData = () => {
    if (loading) return; // Avoid making requests while loading
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "5%" }}>
        NewsMonkey Top headlines of {capitalLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row text-center">
            {articles.length > 0 && articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  date={element.publishedAt}
                  descriptions={element.description ? element.description.slice(0, 88) : ""}
                  urlImage={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  pageSize: 5,
  country: 'in',
  category: "general",
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News;
