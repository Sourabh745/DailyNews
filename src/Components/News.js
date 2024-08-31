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
      const url = `https://api.thenewsapi.com/v1/news/top?locale=${props.country}&categories=${props.category}&api_token=DnjL1ffZ9Tm8zkMmE4Y8JKoKU11VDZtWxx1L5gxS&limit=${props.pageSize}&page=${pageNumber}`;
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

      setArticles(prevArticles => pageNumber === 1 ? parseData.data : [...prevArticles, ...parseData.data]);
      setTotalResults(parseData.meta.found); // Total available results
      setHasMore(parseData.meta.page < Math.ceil(parseData.meta.found / props.pageSize)); // Check if there are more pages
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
              <div className="col-md-4" key={element.uuid}>
                <NewsItem
                  title={element.title}
                  date={element.published_at}
                  descriptions={element.description ? element.description.slice(0, 88) : ""}
                  urlImage={element.image_url}
                  newsUrl={element.url}
                  author="" // The response does not include author information
                  source={element.source}
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
  country: 'us', // Assuming 'us' is the locale code
  category: "general",
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News;
