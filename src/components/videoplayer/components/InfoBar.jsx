import React, { useState } from "react";
import Uploader from "./Uploader";
import Comments from "./Comments";
import ActionBar from "./ActionBar";

const ActionData = { likes: 10, dislikes: 5, isSaved: false };
const UploaderData = [
  {
    avatar:
      "https://i.pinimg.com/originals/b3/ee/4e/b3ee4ebb9b2813d05ec9f1a27a0ff751.jpg",
    name: "Jon Snow",
    subscribers: 300,
  },
];
const TopComment = [
  {
    avatar:
      "https://i.pinimg.com/736x/f0/75/5d/f0755d86cfad51df8ddb474986e72d8f.jpg",
    comment: "I'm thinking miku miku oiii eee ooo",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/f0/75/5d/f0755d86cfad51df8ddb474986e72d8f.jpg",
    comment: "I'm thinking miku miku oiii eee ooo",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/f0/75/5d/f0755d86cfad51df8ddb474986e72d8f.jpg",
    comment: "I'm thinking miku miku oiii eee ooo",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/f0/75/5d/f0755d86cfad51df8ddb474986e72d8f.jpg",
    comment: "I'm thinking miku miku oiii eee ooo",
  },
];
const InfoBar = ({ title, views }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [id, setId] = useState("idRt3fSz");
  return (
    <div className="info-bar p-2 bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm">{views.toLocaleString()} views</p>
      <ActionBar likes={300} isSaved={isSaved} setIsSaved={setIsSaved} actionData={ActionData}/>
      <Uploader
        uploader={"Hatsune Miku"}
        profilePic={
          "https://i.pinimg.com/originals/b3/ee/4e/b3ee4ebb9b2813d05ec9f1a27a0ff751.jpg"
        }
        subscribers={300}
      />

      <Comments
        profilePic="https://i.pinimg.com/736x/f0/75/5d/f0755d86cfad51df8ddb474986e72d8f.jpg"
        text="awesome!"
        
        topComment={TopComment}
      />
    </div>
  );
};
export default InfoBar;
