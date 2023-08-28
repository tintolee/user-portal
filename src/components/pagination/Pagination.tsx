import { Box, Icon } from '@sendsprint/ui-react';
import { ChevronLeftOutline, ChevronRightOutline } from '@sendsprint/ui-react/dist/icons';
import { useMedia } from '@src/hooks';
import { useEffect } from 'react';

interface Props {
  currentPage: number;
  dataLength: number;
  postsPerPage?: number;
  displayedBtns?: number;
  currentPageFunc: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  currentPage = 1,
  currentPageFunc,
  dataLength,
  postsPerPage = 10,
  displayedBtns = 5
}) => {
  const pageNumbers: number[] = [];
  const mappedBtnsNumbers: number[] = [];
  const { isMobile } = useMedia();

  const highestNumber = Math.ceil(dataLength / postsPerPage);

  for (let i = 1; i <= highestNumber; i++) {
    pageNumbers.push(i);
  }

  displayedBtns = isMobile ? 3 : displayedBtns;

  useEffect(() => {
    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('ss-bg-primary1-500');
      paginationIcons[i].classList.remove('ss-text-white');

      if (Number(paginationIcons[i].innerHTML) === currentPage) {
        paginationIcons[i].classList.add('ss-bg-primary1-500');
        paginationIcons[i].classList.add('ss-text-white');
      }
    }
  }, [currentPage]);

  const handlePagination = (e: React.MouseEvent<HTMLElement>, pageNumber: number) => {
    currentPageFunc(pageNumber);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    paginationIcons.forEach((icon) => {
      icon.classList.remove('ss-bg-primary1-500');
      icon.classList.remove('ss-text-white');
    });

    e.currentTarget.classList.add('ss-text-white');
    e.currentTarget.classList.add('ss-bg-primary1-500');
  };

  const nextPagination = () => {
    if (currentPage === highestNumber) {
      return currentPageFunc((current: number) => current + 0);
    }
    currentPageFunc((current: number) => current + 1);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('ss-bg-primary1-500');
      paginationIcons[i].classList.remove('ss-text-white');

      if (Number(paginationIcons[i].innerHTML) === currentPage + 1) {
        paginationIcons[i].classList.add('ss-bg-primary1-500');
        paginationIcons[i].classList.add('ss-text-white');
      }
    }
  };

  const prevPagination = () => {
    if (currentPage <= 1) {
      return currentPageFunc((current: number) => current - 0);
    }
    currentPageFunc((current: number) => current - 1);

    const paginationIcons = document.querySelectorAll('.pagination__page');

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove('ss-bg-primary1-500');
      paginationIcons[i].classList.remove('ss-text-white');

      if (Number(paginationIcons[i].innerHTML) === currentPage - 1) {
        paginationIcons[i].classList.add('ss-bg-primary1-500');
        paginationIcons[i].classList.add('ss-text-white');
      }
    }
  };

  const handlePaginate = (num: number) => {
    currentPageFunc(num);
  };

  let maxLeft = currentPage - Math.floor(displayedBtns / 2);
  let maxRight = currentPage + Math.floor(displayedBtns / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = displayedBtns;
  }

  if (maxRight > highestNumber) {
    maxRight = highestNumber;

    maxLeft = highestNumber - (displayedBtns - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }

  for (let i = maxLeft; i <= maxRight; i++) {
    mappedBtnsNumbers.push(i);
  }

  return (
    <Box className="ss-flex ss-items-center ss-bg-neutral-5 ss-p-3 ss-rounded">
      {/* <Box
        className="pagination__prev ss-mr-2 ss-cursor-pointer"
        onClick={() => handlePaginate(1)}
      >
        <span className="pagination__nextText">
          <img src={arrowRight} alt="" />
        </span>
      </Box> */}
      <button
        className="pagination__prev ss-outline-none focus:ss-focus-ring ss-rounded ss-cursor-pointer disabled:ss-opacity-40 disabled:ss-cursor-not-allowed"
        onClick={prevPagination}
        disabled={currentPage === 1}>
        <span className="pagination__nextText">
          <Icon svg={ChevronLeftOutline} size={30} />
        </span>
      </button>
      {!mappedBtnsNumbers.includes(1) && (
        <>
          <Box
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            onClick={(e) => handlePaginate(1)}
            className={`pagination__page ss-cursor-pointer ss-py-2 ss-px-4 ss-rounded`}
            // datanumber={number}
          >
            1
          </Box>
          <Box className="ss-mx-2 ss-flex ss-items-center">
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
          </Box>
        </>
      )}
      {mappedBtnsNumbers !== undefined &&
        mappedBtnsNumbers.map((number) => {
          return (
            <Box
              onClick={(e) => handlePagination(e, number)}
              key={number}
              className={`pagination__page ss-cursor-pointer ss-py-2 ss-px-4 ss-rounded ${
                number === 1 ? 'ss-bg-primary1-500 ss-text-white' : ''
              } `}
              // datanumber={number}
            >
              {number}
            </Box>
          );
        })}
      {!mappedBtnsNumbers.includes(highestNumber) && (
        <>
          <Box className="ss-mx-2 ss-flex ss-items-center">
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
            <span className="ss-w-1 ss-h-1 ss-rounded ss-bg-neutral-40 ss-mx-1"></span>
          </Box>
          <Box
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            onClick={(e) => handlePaginate(highestNumber)}
            className={`pagination__page ss-cursor-pointer ss-py-2 ss-px-4 ss-rounded`}
            // datanumber={number}
          >
            {highestNumber}
          </Box>
        </>
      )}
      <button
        className="pagination__next ss-outline-none focus:ss-focus-ring disabled:ss-opacity-40 disabled:ss-cursor-not-allowed ss-rounded ss-cursor-pointer"
        onClick={nextPagination}
        disabled={currentPage === highestNumber}>
        <span className="pagination__nextText">
          <Icon svg={ChevronRightOutline} size={30} />
        </span>
      </button>
      {/* <Box
        className="pagination__next ss-ml-2 ss-cursor-pointer"
        onClick={() => handlePaginate(highestNumber)}
      >
        <span className="pagination__nextText">
          <img src={arrowRight} alt="" />
        </span>
      </Box> */}
    </Box>
  );
};

export default Pagination;
