import { useState } from 'react';

const usePagination = <T>(data: T[], initialPageNumber = 1, postsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [numOfPagePosts] = useState(postsPerPage);

  const indexOfLastPost = currentPage * numOfPagePosts;
  const indexOfFirstPost = indexOfLastPost - numOfPagePosts;
  const slicedPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  const shownData = currentPage * numOfPagePosts;

  const dataLength = data.length;

  return {
    slicedPosts,
    currentPage,
    setCurrentPage,
    numOfPagePosts,
    dataLength,
    shownData
  };
};

export default usePagination;
