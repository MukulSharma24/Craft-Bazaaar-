import React from 'react';
import './Productbar.css'; 
import familyPicture from '../../Assets/family-picture.png'; 
import bag from '../../Assets/bag.png';
import bookmark from '../../Assets/bookmark.png';
import keychain from '../../Assets/keychain.png';
import polaroid from '../../Assets/polaroid.png';
import mandala from '../../Assets/mandala.png';
import fridge from '../../Assets/fridge.png';
import paint from '../../Assets/paint.png';
import resin from '../../Assets/resin.png';
import wallhanging from '../../Assets/wallhanging.png';
import { Link } from 'react-router-dom';

  const Productbar = ({ hideImages }) => {
  return (
    <div className="bar">
      <div className="product">
        <Link to='../pages/Portraits'>
        {!hideImages && <img src={familyPicture} alt="family portrait" />} 
        <p>Portrait</p>
        </Link>
      </div>
      
      <div className="product">
      <Link to='../pages/ResinArt'>
      {!hideImages &&<img src={resin} alt="resin" />}
        <p>Resin Art</p>
        </Link>
      </div>
      
      <div className="product">
        <Link to='../pages/Bookmark'>
        {!hideImages &&<img src={bookmark} alt="bookmark" />}
        <p>Bookmark</p>
        </Link>
        </div>

      <div className="product">
        <Link to='../pages/Keychains'>
        {!hideImages &&<img src={keychain} alt="keychain" />}
        <p>Keychain</p>
        </Link>
        </div>

      <div className="product">
        <Link to='../pages/Polaroids'>
        {!hideImages &&<img src={polaroid} alt="polaroid" />}
        <p>Polaroid</p>
        </Link>
       </div>

      <div className="product">
        <Link to='../pages/LippanArt'>
        {!hideImages &&<img src={mandala} alt="mandala" />}
        <p>Lippan Art</p>
        </Link>
      </div>
      
      <div className="product">
        <Link to='../pages/FridgeMagnet'>
        {!hideImages &&<img src={fridge} alt="fridge" />}
        <p>Fridge Magnets</p>
        </Link>
      </div>
      
      <div className="product">
        <Link to='../pages/Paintings'>
        {!hideImages &&<img src={paint} alt="paint" />}
        <p>Paintings</p>
        </Link>
      </div>

      <div className="product">
        <Link to='../pages/Purse'>
        {!hideImages &&<img src={bag} alt="bag" />}
        <p>Purse</p>
        </Link>
      </div>

      <div className="product">
        <Link to='../pages/WallHanging'>
        {!hideImages &&<img src={wallhanging} alt="wallhanging" />}
        <p>Wall Hanging</p>
        </Link>
      </div>
    </div>
  );
};

export default Productbar;
