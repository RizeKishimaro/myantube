import React from "react";


const Comments = ({ profilePic, text, topComment }) => {
  return (
  
      <div className="bg-gray-700 p px-3 py-2 rounded-md">
        <p className="text-xl ml-1.5 ">Comments</p>
    <div className="collapse ">
      
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
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
      <div className="collapse-content space-y-5">
        {topComment.map(({ avatar, comment },index) => {
          return (
            <div className="flex items-start space-x-4 my-4" key={index}>
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
