import React from 'react';
import { ModalContent, ModalActions, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { hideDeleteModal } from '../../4_features/friends/model/friendsSlice';
import { useFriend } from '../../4_features/friends/lib/useFriends';


export default function ModalDeleteFriend(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { showDeleteModal, selectedFriend } = useAppSelector((store) => store.friend);
  const {deleteFriend} = useFriend()

if (!selectedFriend) return null

  return (
    <Modal
      closeIcon
      open={showDeleteModal}
      onClose={() => {
        dispatch(hideDeleteModal());
      }}
    >
      <Header icon="warning sign" content="Предупреждение" />
      <ModalContent>
        <p>
          {`Подтвердите удаление пользователя ${selectedFriend.name} из друзей`}
        </p>
      </ModalContent>
      <ModalActions>
        <Button onClick={() => dispatch(hideDeleteModal())}>
           Отмена
        </Button>
        <Button color="red" onClick={() => {
          deleteFriend(selectedFriend.id, selectedFriend.name)
          dispatch(hideDeleteModal())
          }}>
          <Icon name="checkmark" /> Подтверждаю
        </Button>
      </ModalActions>
    </Modal>
  );
}
