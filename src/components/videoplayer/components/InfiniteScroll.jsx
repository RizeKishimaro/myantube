import { useIntersection } from '@mantine/hooks';
import React, { useEffect,useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

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
const InfiniteScroll = () => {
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

  const image = "https://images.squarespace-cdn.com/content/v1/5c35f5d3aa49a15cc46e1a1e/1587442181539-EH0212KH7T6MR5TZ3QPX/AW-SPECTRE-HD.jpg";
  const artist = "Alan Walker"
  const title ="Spectre"
  const totalTime = "4:12"

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <img src={image} alt="Song Image" className="w-16 h-16 rounded-lg" />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{artist}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-500">{totalTime}</p>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 1.414L4.707 9H15a1 1 0 110 2H4.707l1.707 1.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3zM5 5a1 1 0 011-1h9a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" clipRule="evenodd" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 1.414L4.707 9H15a1 1 0 110 2H4.707l1.707 1.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3zM5 5a1 1 0 011-1h9a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" clipRule="evenodd" />
            </svg>
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>

      words: {
      _posts.map((post,index)=>{
        if(index === _posts.length -1) return <div key={post.id} className='h-80 bg-white text-black' ref={ref}></div>
       return <div className='h-80 bg-white text-black' key={post.id}>
        
          {post.title}
      </div>})
    
    }     <button onClick={fetchNextPage}>
        {isFetchingNextPage ? "Loading more": (data.pages.length ?? 0 )< 3 ? "Load More": "You're near dead end"}
      </button>
    </div>
  )
}

export default InfiniteScroll
