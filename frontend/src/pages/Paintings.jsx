import React from 'react';
import CategoryPage from '../components/CategoryPage';

function Paintings() {
  return (
    <CategoryPage
      title="Paintings"
      subtitle="Original hand-painted artworks made to order — statement pieces that bring colour and emotion to any wall."
      endpoint="Paintings"
    />
  );
}

export default Paintings;
