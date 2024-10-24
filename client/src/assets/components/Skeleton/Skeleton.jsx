import React from 'react';

const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="relative group bg-white p-4 transition-all">
          <div className="overflow-hidden rounded-md bg-gray-200 animate-pulse h-48 w-full"></div>
          <div className="mt-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-3 bg-gray-200 animate-pulse rounded mb-1"></div>
            <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="mt-4">
            <button className="w-full p-2 bg-gray-300 rounded-md text-sm montserrat cursor-not-allowed">
              
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;