import React from 'react';

const NewsItem = (props) => {
    let {title,descriptions,urlImage,newsUrl,date,author,source} = props;
    console.log('Image URL:', urlImage);
    return (
      <div className="my-3">
                      
            <div className="card">
            <div  style={{display:'flex',justifyContent:"flex-end",position:'absolute',right:'0'}}>
              <span className="badge rounded-pill bg-danger">{source}</span>
              </div>
              <img src={!urlImage ? "notFound.png": urlImage} className="card-img-top" alt="..."/>
              <div className="card-body">

                <h5 className="card-title">{title}</h5>
                <p className="card-text">{descriptions}</p>
                <p className="card-text"><small className='text-muted'>By {author?author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark" >Read more </a>
              </div>
            </div>
      </div>
    );
  
}

export default NewsItem;
