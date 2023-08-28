import { useEffect, useState } from 'react';

const useLazyPagination = <T>(data: T[] | undefined, initialPageNumber = 1, postsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [numOfPagePosts] = useState(postsPerPage);
  const [highestNo, setHighestNo] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const indexOfLastPost = currentPage * numOfPagePosts;
  const slicedPosts = data?.slice(0, indexOfLastPost);

  //   const pageNumbers = [];

  useEffect(() => {
    if (data) {
      setHighestNo(data.length / postsPerPage);
    }
  }, [data, postsPerPage]);

  useEffect(() => {
    if (currentPage >= highestNo) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [currentPage, highestNo]);

  //   for (let i = 1; i <= highestNo; i++) {
  //     pageNumbers.push(i);
  //   }

  const handleClick = () => {
    if (currentPage >= highestNo) {
      setCurrentPage(highestNo);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return { slicedPosts, handleClick, isLastPage };
};

export default useLazyPagination;
