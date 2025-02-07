import React from 'react';
import { ModalContent, ModalActions, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { hideDeleteModal } from '../../4_features/friends/model/friendsSlice';
import { useFriend } from '../../4_features/friends/lib/useFriends';
import Spinner from '../../6_shared/ui/Spinner';
import style from './ModalDeleteFriend.module.scss';


export default function ModalDeleteFriend(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { showDeleteModal, selectedFriend, loading } = useAppSelector((store) => store.friend);
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
        <Button className={style.button} disabled={loading} color="red" onClick={() => {
          deleteFriend(selectedFriend.id, selectedFriend.name)
          setTimeout(() => {
            dispatch(hideDeleteModal())
          }, 1000);
          }}>
            {loading ? <Spinner/> : <><Icon name="checkmark"/> Подтверждаю</>}
          
        </Button>
      </ModalActions>
    </Modal>
  );
}
