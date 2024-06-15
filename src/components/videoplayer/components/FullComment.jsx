import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Ensure you have axios installed
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

const FullComment = ({ setViewComments }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchComments = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/comments`, {
        params: { page, limit: 10 } // Adjust limit as needed
      });
      const newComments = response.data.comments;
      setComments(prevComments => [...prevComments, ...newComments]);
      setLoading(false);
      if (newComments.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page);
  }, [page]);

  const lastCommentRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (lastCommentRef.current) {
      observer.current.observe(lastCommentRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-700 mt-3 h-60 relative overflow-x-hidden overflow-y-scroll px-3 rounded-md">
      <p className="sticky top-0 bg-gray-700 z-50 px-2 py-2">
        <span className="text-lg">Comments {comments.length}</span>
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
