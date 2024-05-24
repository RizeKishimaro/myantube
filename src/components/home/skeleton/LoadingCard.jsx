import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingCard = () => {
  return (
    <div className="w-80 m-4">
      <Skeleton height={180} />
      <div className="flex items-center mt-4">
        <Skeleton circle={true} height={40} width={40} />
        <div className="ml-4 flex-1">
          <Skeleton width={`80%`} />
          <Skeleton width={`60%`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
