import React from 'react';

import { ModalContent, ModalActions, Button, Modal, Form, FormField } from 'semantic-ui-react';

import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';

import { closeModal } from './modalSlice';
import { useParams } from 'react-router-dom';
import { addWish } from '../../../5_entities/wish/lib/wishThunk';
import { WishObjectSchema } from '../../../5_entities/wish/types/types';

export default function ModalUiWish(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const showModal = useAppSelector((state) => state.modal_add.showModal);
  const { listId } = useParams();

  const addHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const validDate = WishObjectSchema.omit({ id: true }).parse({
      ...dataForm,
      wishListId: Number(listId),
    });
    console.log(validDate, 'qqqqqqqqqqqq');

    try {
      await dispatch(addWish(validDate));
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
            <label>Название подарка</label>
            <input name="title" placeholder="Введите название подарка" />
          </FormField>
          <FormField>
            <label>Картинка</label>
            <input name="file" type="text" placeholder="url картинки" />
          </FormField>

          <FormField>
            <label>Ссылка на товар</label>
            <input name="wishUrl" type="url" placeholder="Вставьте ссылку" />
          </FormField>
          <FormField>
            <label>Цена в рублях</label>
            <input name="price" type="number" placeholder="0 ₽" />
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
