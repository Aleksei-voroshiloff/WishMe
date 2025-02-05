import React, { useEffect } from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Form,
  FormField,
} from 'semantic-ui-react';
import { closeWindow, setSearch } from '../../4_features/friends/model/friendsSlice';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { findFriendsThunk } from '../../4_features/friends/lib/friendsThunk';
import FriendCardComponent from '../../4_features/friends/ui/FriendCardComponent/FriendCardComponent';

export default function ModalFindFriends(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { search, modalShow, foundFriends, foundFriendsLoading } = useAppSelector(
    (store) => store.friend,
  );

  useEffect(() => {
    const timeOut = setTimeout(() => {
      void dispatch(findFriendsThunk(search));
    }, 1500);
    return () => clearTimeout(timeOut);
  }, [search]);

  return (
    <Modal size="small" open={modalShow} onClose={() => dispatch(closeWindow())}>
      <ModalHeader>Поиск</ModalHeader>
      <ModalContent>
        <Form>
          <FormField>
            <label>Введите имя пользователя</label>
            <input
              name="search"
              type="text"
              defaultValue=""
              value={search}
              onChange={(e) => dispatch(setSearch(e.currentTarget.value))}
            />
            {foundFriendsLoading ? (
              <p>Идет поиск</p>
            ) : (
              foundFriends.map((foundFriend) => (
                <FriendCardComponent key={foundFriend.id} friend={foundFriend} />
              ))
            )}
          </FormField>
          <ModalActions style={{ marginTop: '20px' }}>
            <Button onClick={() => dispatch(closeWindow())}>Вернуться</Button>
          </ModalActions>
        </Form>
      </ModalContent>
    </Modal>
  );
}
