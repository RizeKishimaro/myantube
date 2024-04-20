import React from "react";

const CommentArray = [
  {
    profile: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/909da78d-bff6-47f3-ba4d-f3279c967428/dfea5p0-b94607be-004d-4251-8dd8-f8c91d0c1dbd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzkwOWRhNzhkLWJmZjYtNDdmMy1iYTRkLWYzMjc5Yzk2NzQyOFwvZGZlYTVwMC1iOTQ2MDdiZS0wMDRkLTQyNTEtOGRkOC1mOGM5MWQwYzFkYmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.F6bEBGYc_kouzzSgQhZsmn9nf4js_ReygP3b7Tj_61o",
    commentText: "Really really nice video sis!",
  },
  
];

const Comments = ({ profilePic, text }) => {
  return (
  
      <div className="bg-gray-700 px-3 py-2 rounded-md">
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
      <div className="collapse-content">
        {CommentArray.map(({ profile, commentText },index) => {
          return (
            <div className="flex items-start space-x-4 my-4" key={index}>
              <img
                src={profile}
                className="w-6 h-6 rounded-full"
                alt="Profile"
              />
              <div className="">
                <p className="text-white text-sm">{commentText}</p>
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
