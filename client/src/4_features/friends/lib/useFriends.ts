import { throttle } from 'lodash';
import { useEffect, useMemo } from 'react';
import { acceptFriendThunk, addFriendThunk, deleteFriendThunk } from './friendsThunk';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../1_app/store/hooks';
import type { useFriendType } from '../types/types';

export function useFriend(): useFriendType {
  const dispatch = useAppDispatch();

  const throttledAddFriend = useMemo(
    () =>
      throttle((friendId: number) => {
        dispatch(addFriendThunk(friendId))
          .unwrap()
          .then(() => {
            toast.success('Заявка отправлена!', {
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
            });
          })
          .catch((error: unknown) => {
            console.log(error);
            toast.error('Ошибка отправки заявки!', {
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
            });
          });
      }, 4000),
    [dispatch],
  );

  const deleteFriend = (friendId: number, name: string): void => {
    dispatch(deleteFriendThunk(friendId))
      .unwrap()
      .then(() => {
        toast.success(`${name} удалён-(а) из друзей`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      })
      .catch((error: unknown) => {
        console.log(error);
        toast.error('Ошибка удаления', {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  const cancelRequest = (friendId: number, name: string): void => {
    dispatch(deleteFriendThunk(friendId))
      .unwrap()
      .then(() => {
        toast.success(`Заявка в на добавление ${name} в друзья отменена`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      })
      .catch((error: unknown) => {
        console.log(error);
        toast.error('Ошибка', {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  const acceptRequest = (friendId: number): void => {
    dispatch(acceptFriendThunk(friendId))
      .unwrap()
      .then(() => {
        toast.success(`Заявка в друзья принята`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      })
      .catch((error: unknown) => {
        console.log(error);
        toast.error('Ошибка принятия заявки', {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  const rejectRequest = (friendId: number): void => {
    dispatch(deleteFriendThunk(friendId))
      .unwrap()
      .then(() => {
        toast.success(`Заявка в друзья отклонена`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      })
      .catch((error: unknown) => {
        console.log(error);
        toast.error('Ошибка', {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      });
  };

  useEffect(
    () => () => {
      throttledAddFriend.cancel();
    },
    [throttledAddFriend],
  );

  return { throttledAddFriend, deleteFriend, cancelRequest, acceptRequest, rejectRequest };
}
