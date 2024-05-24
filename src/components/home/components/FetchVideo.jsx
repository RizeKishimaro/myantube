import { useIntersection } from '@mantine/hooks';
import React, { useEffect,useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import VideoInfo from './VideoInfo';
import LoadingCard from '../skeleton/LoadingCard';

const posts = [
  { id: 1, title: "nico nico neee" },
  { id: 2, title: "kawaii" },
  { id: 3, title: "otaku" },
  { id: 4, title: "senpai" },
  { id: 5, title: "nakama" },
  { id: 6, title: "kamehameha" },
  { id: 7, title: "yandere" },
  { id: 8, title: "baka" },
  { id: 9, title: "chibi" },
  { id: 10, title: "kira kira" },
];
const fetchPost = async(page)=>{
  await new Promise((resolve)=> setTimeout(resolve,1000));
  return posts.slice((page -1) *2 ,page *2)
}
const FetchVideo = () => {
  const {data,fetchNextPage,isFetchingNextPage} = useInfiniteQuery(["query"],async({ pageParam = 1})=>{
    const response = fetchPost(pageParam);
    return response;
  },
    {
      getNextPageParam:(_, pages)=>{
        return pages.length +1
      },
      initialData: {
        pages: [posts.slice(0,2)],
        pageParams: [1]
      }
    })

  const lastPostRef = useRef(null)
  const {ref, entry} = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });

useEffect(()=>{
  if(entry?.isIntersecting) fetchNextPage()
},[entry])
  const _posts = data.pages.flatMap((page)=>page)

  return (
    <div>
      words: {
      _posts.map((post,index)=>{
        if(index === _posts.length -1) return <div key={post.id} ref={ref}><VideoInfo/></div>
       return <VideoInfo key={post.id}/>
      })

    }     <button onClick={fetchNextPage}>
        {isFetchingNextPage ? <LoadingCard />: (data.pages.length ?? 0 )< 3 ? "Load More": "You're near dead end"}
      </button>
    </div>
  )
}

export default FetchVideo
