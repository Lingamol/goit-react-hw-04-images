import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
import React from 'react';
import { PagginationWrapper } from './GalleryPagination.styled';

const GalleryPagination = ({ onPagination, pageNumber, countPages }) => {
  return (
    <PagginationWrapper>
      <Pagination
        // boundaryCount={5}
        count={countPages}
        // page={pageNumber}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={(e, page) => onPagination(page)}
      />
    </PagginationWrapper>
  );
};

export default GalleryPagination;
