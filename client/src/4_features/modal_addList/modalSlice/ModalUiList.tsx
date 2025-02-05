import React from 'react';

import { ModalContent, ModalActions, Button, Modal, Form, FormField } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';

import { addWishList } from '../../../5_entities/wishlist/lib/wishListThunk';
import { WishListObjectSchema } from '../../../5_entities/wishlist/types/types';
import { closeModal } from '../../../5_entities/modal_window/modalSlice';

export default function ModalUiList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.modal.showModal);
  const user = useAppSelector((state) => state.user.data);

  const addHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const validDate = WishListObjectSchema.omit({ id: true }).parse({
      ...dataForm,
      userId: user?.id,
    });
    console.log(validDate, 'qqqqqqqqqqqq');

    try {
      await dispatch(addWishList(validDate));
    } catch (error) {
      console.error('Error dispatching addWishList:', error);
    }
    dispatch(closeModal());
  };

  return (
    <Modal size="small" open={showModal} onClose={() => dispatch(closeModal())}>
      <ModalContent>
        <Form onSubmit={addHandler}>
          <FormField>
            <label>Название вишлиста</label>
            <input name="title" placeholder="День рождения/свадьба/8марта..." />
          </FormField>
          <FormField>
            <label>Дата мероприятия</label>
            <input name="date" type="date" />
          </FormField>
          <ModalActions style={{ marginTop: '20px' }}>
            <Button color="google plus" onClick={() => dispatch(closeModal())}>
              Вернуться к вишлистам
            </Button>
            <Button color="linkedin" type="submit">
              Создать
            </Button>
          </ModalActions>
        </Form>
      </ModalContent>
    </Modal>
  );
}
