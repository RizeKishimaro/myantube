import React from "react";

const Uploader = ({ profilePic, uploader, subscribers }) => {
  return (
    <div className="uploader-info-bar px-2 py-3 bg-inherit text-white flex flex row justify-between">
      <div className={"flex items-center"}>
        <div className="">
          <img src={profilePic} className="w-10 text-center my-auto rounded-full" />
        </div>
        <div className={"ml-3"}>
          <h2 className="text-xl font-semibold">{uploader}</h2>
          <p className="text-sm">{subscribers.toLocaleString()} subscribers</p>
        </div>
      </div>

      <button className="subscribe-btn py-2 px-5 bg-red-500 text-white rounded-full">
        Subscribe
      </button>
    </div>
  );
};
export default Uploader;
