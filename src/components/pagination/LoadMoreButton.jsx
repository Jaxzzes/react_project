import React from 'react';
import MyButton from '../button/MyButton';

const LoadMoreButton = ({ onClick }) => {
  const handleLoadMore = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="button-block">
      <MyButton onClick={handleLoadMore} className="load-more-button">
        Load More
      </MyButton>
    </div>
  );
};

export default LoadMoreButton;
