import React from 'react';
import Link from 'next/link';
import Button from '../../common/Button';
import SearchIcon from '../../../public/static/svg/search/white_search.svg';

const SearchRoomButton = () => {
  return (
    <Link href="/room">
      <a>
        <Button icon={<SearchIcon />} color="amaranth" width="89px">
          검색
        </Button>
      </a>
    </Link>
  );
};

export default SearchRoomButton;
