// SkeletonLoader.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => (
  <div className="p-4 bg-gray-900 text-white rounded-lg">
    <Skeleton height={30} width={200} className="mb-2" />
    <Skeleton height={20} width={300} className="mb-4" />
    <Skeleton height={50} width={150} className="mb-4" />
    <Skeleton height={20} width={100} className="mb-4" />
    <div className="flex items-center mb-4">
      <Skeleton circle={true} height={40} width={40} className="mr-3" />
      <Skeleton height={20} width={150} />
    </div>
    <Skeleton height={20} width={100} className="mb-4" />
    <Skeleton height={20} count={3} className="mb-2" />
  </div>
);

export default SkeletonLoader;
