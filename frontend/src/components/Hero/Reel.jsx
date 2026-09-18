import React from 'react';
import './Reel.css';

const Reel = () => {
  return (
    <div className="reels-section">
      <h2>Our Latest Reels</h2>
      <div className="reels-container">
        {/* First Pinterest Reel */}
        <div className="reel">
          <iframe 
            src="https://assets.pinterest.com/ext/embed.html?id=444730531967562583" 
            height="713" 
            width="345" 
            frameBorder="0" 
            scrolling="no" 
            title="Pinterest Reel 1"
          ></iframe>
        </div>
        
        {/* Second Pinterest Reel */}
        <div className="reel">
          <iframe 
            src="https://assets.pinterest.com/ext/embed.html?id=946600415415154059" 
            height="714" 
            width="345" 
            frameBorder="0" 
            scrolling="no" 
            title="Pinterest Reel 2"
          ></iframe>
        </div>

        <div className="reel">
          <iframe 
         src="https://assets.pinterest.com/ext/embed.html?id=1024498615214548870"
             height="714"
              width="345" 
              frameborder="0"
               scrolling="no" >
             </iframe>
        </div>
      </div>
    </div>
  );
};

export default Reel;
