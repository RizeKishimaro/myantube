import React from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../api/axios';
import VideoInfo from './components/VideoInfo';
import LoadingCard from './skeleton/LoadingCard';
import Error from '../error/Error';

const fetchVideos = async () => {
  const { data } = await axiosInstance.get('/video',{
    params:{
      page: 0,
      limit:10
    }
  });
  return data;
};

const Home = () => {
  const { data: videos, isLoading, error, isSuccess } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });
  if (isLoading) {
    return (
      <div className="flex flex-wrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-wrap flex-col">
      {videos.map(({author,video}, index) => (
        <VideoInfo
          key={index}
          id={video.id}
          image={video.poster}
          title={video.title}
          duration={video.duration}
          views={video.status.views}
          uploaderName={author.name}
          uploaderImage={author.picture}
        />
      ))}
    </div>
  );
};

export default Home;
