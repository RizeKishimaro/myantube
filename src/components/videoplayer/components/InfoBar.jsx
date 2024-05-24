import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Uploader from './Uploader';
import Comments from './Comments';
import ActionBar from './ActionBar';
import axiosInstance from "../../api/axios";
import SkeletonLoader from '../skeleton/SkeletonLoader';
import { useSearchParams } from 'react-router-dom';

const fetchVideoData = async (idParam) => {
  const { data } = await axiosInstance.get(`/video/${idParam}`);
  return data.data;
};

const InfoBar = ({ setPoster }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [searchParam] = useSearchParams();
  const idParam = searchParam.get("id");

  const { data, error, isLoading } = useQuery('videoData', () => fetchVideoData(idParam));

  useEffect(() => {
    if (data && data.video && data.video.poster) {
      setPoster(data.video.poster);
    }
  }, [data, setPoster]);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p className="text-red-500">Error loading data</p>;

  const { uploader, video } = data;
  const { name, picture } = uploader;
  const { id, poster, description, title: videoTitle, comment, status } = video;
  const { likes, dislikes, views } = status;

  return (
    <div className="info-bar p-2 bg-gray-900 text-white">
      <h2 className="text-xl font-semibold">{videoTitle}</h2>
      <p className="text-sm">{views.toLocaleString()} views</p>
      <ActionBar
        likes={likes}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        actionData={{ likes, dislikes, isSaved: false }}
      />
      <Uploader
        uploader={name}
        profilePic={`${import.meta.env.VITE_APP_BACKEND_URL}/${picture}`}
        subscribers={0}
      />
      <Comments
        profilePic={`${import.meta.env.VITE_APP_BACKEND_URL}/${comment[0].profile}`}
        text={comment[0].text}
        topComment={comment}
      />
    </div>
  );
};

export default InfoBar;
