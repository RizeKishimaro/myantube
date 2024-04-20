import React from "react";


const Comments = ({ profilePic, text, topComment }) => {
  return (
  
      <div className="bg-gray-700  px-3 py-2 rounded-md">
        <p className="text-xl ml-1.5 ">Comments</p>
    <div className="collapse space-y-5 space-x-4">
      <input className="min-h-0" type="checkbox" />
      <div className="collapse-title p-0 min-h-0 text-xl font-medium">
        <div className="flex items-start space-x-4 my-2">
          <img
            src={profilePic}
            className="w-6 h-6 rounded-full"
            alt="Profile"
          />
          <div className="">
            <p className="text-white text-sm">{text}</p>
          </div>
        </div>
      </div>
      <div className="collapse-content p-0 m-0">
        {topComment.map(({ avatar, comment },index) => {
          return (
            <div className="flex items-start space-x-4 mb-3" key={index}>
              <img
                src={avatar}
                className="w-6 h-6 rounded-full"
                alt="Profile"
              />
              <div className="">
                <p className="text-white text-sm">{comment}</p>
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
