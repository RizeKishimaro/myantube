import React from "react";

const Comments = ({ profilePic, text, topComment }) => {
  return (
    <div className="bg-gray-700  px-3 py-2 rounded-md">
      <p className="text-xl ml-1.5 ">Comments</p>
      <div className="collapse ml-3">
        <input className="min-h-0" type="checkbox" />
        <div className="collapse-title p-0 m-0 min-h-0 text-xl font-medium">
          <div className="flex items-start my-3">
            <img
              src={profilePic}
              className="w-6 h-6 rounded-full"
              alt="Profile"
            />
            <div className="ml-3">
              <p className="text-white text-sm">{text}</p>
            </div>
          </div>
        </div>
        <div className="collapse-content p-0 m-0">
          {topComment.map(({ text, profile }, index) => {
            if(index ===0){
              return null
            }
            return (
              <div className="flex items-start space-x-4 mb-3" key={index}>
                <img
                  src={`http://127.0.0.1:3000/${profile}`}
                  className="w-6 h-6 rounded-full"
                  alt="Profile"
                />
                <div className="ml-3">
                  <p className="text-white text-sm">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
