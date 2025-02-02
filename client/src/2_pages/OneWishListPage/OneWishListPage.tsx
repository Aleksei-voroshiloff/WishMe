

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneWishList } from '../../5_entities/wishlist/lib/wishListThunk';

export default function OneWishListPage(): React.ReactElement {
    const { listId } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
       void dispatch(getOneWishList(listId));
      }, [dispatch, listId]);

  return (
    <div>OneWishListPage</div>
  )
}