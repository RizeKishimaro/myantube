import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CommentSkeleton = () => {
  return (
    <div className="bg-gray-700 px-3 py-2 rounded-md">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex items-start my-3">
          <Skeleton circle={true} height={24} width={24} />
          <div className="ml-3 w-full">
            <Skeleton height={20} width={`75%`} />
            <Skeleton height={20} width={`50%`} />
          </div>
        </div>
      ))}
    </div>
  );
};

const FullComment = () => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadComments = () => {
    setLoading(true);
    setTimeout(() => {
      const newComments = [...Array(5)].map((_, index) => ({
        id: comments.length + index,
        text: `Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.`,
        profileImg: "https://ih1.redbubble.net/image.5491736425.7162/flat,800x800,075,f.jpg"
      }));
      setComments(prevComments => [...prevComments, ...newComments]);
      setLoading(false);
      if (comments.length + newComments.length >= 27) {
        setHasMore(false);
      }
    }, 2000);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const lastCommentRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadComments();
      }
    });
    if (lastCommentRef.current) {
      observer.current.observe(lastCommentRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-700 mt-3 h-60 relative overflow-x-hidden overflow-y-scroll px-3 rounded-md">
      <p className="sticky top-0 bg-gray-700 z-50 px-2 py-2">
        <span className="text-lg">Comments {comments.length + 1}</span>
      </p>
      <div>
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className="collapse ml-3 my-2"
            ref={comments.length === index + 1 ? lastCommentRef : null}
          >
            <input className="min-h-0" type="checkbox" />
            <div className="collapse-title p-0 m-0 min-h-0 text-xl flex items-start my-3">
              <img
                src={"https://i.pinimg.com/736x/cb/93/1d/cb931dc161a5f8e4f74832f1a4f2c58a.jpg"}
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
              <div className="ml-3">
                <p className="text-white text-sm">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && <CommentSkeleton />}
      </div>
    </div>
  );
};

export default FullComment;
