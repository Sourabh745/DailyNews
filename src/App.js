import React, {useState} from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes}from "react-router-dom";

function App() {
  let pageSize=5;
  const [progress, setProgress] = useState(0);

  const style = {
    backgroundColor: '#F4F4F4',
    padding: '20px', // Example padding
    height: '100%', // Full viewport height (optional)
    color: '#333', // Example text color
  }

    return (
      <div style={style}>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
          <Navbar/>
          
            <Routes>
              <Route exact path="/" element={<News setProgress={setProgress} key='general' pageSize={pageSize} country='us' category='general'/>} />   
              <Route exact path="/business" element={<News setProgress={setProgress} key='business' pageSize={pageSize} country='us' category='business'/>} />
              <Route exact path="/entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} country='us' category='entertainment'/>} />
              <Route exact path="/health" element={<News setProgress={setProgress} key='health' pageSize={pageSize} country='us' category='health'/>} />
              <Route exact path="/science" element={<News setProgress={setProgress} key='science' pageSize={pageSize} country='us' category='science'/>} />
              <Route exact path="/technology" element={<News setProgress={setProgress} key='technology' pageSize={pageSize} country='us' category='tech'/>} />
              <Route exact path="/sports" element={<News setProgress={setProgress} key='sports' pageSize={pageSize} country='us' category='sports'/>} />
            </Routes>
        </Router>
      </div>
    );
  
}
export default App;