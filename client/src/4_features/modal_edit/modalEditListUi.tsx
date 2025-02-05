import React from 'react';

import { ModalContent, ModalActions, Button, Modal, Form, FormField } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { updateWish } from '../../5_entities/wish/lib/wishThunk';
import { WishObjectSchema } from '../../5_entities/wish/types/types';
import { closeEditModal } from '../../5_entities/wish/model/wishSlice';

export default function ModalUiWishEdit(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.wishlist.oneWishList);
  const showModalEdit = useAppSelector((state) => state.wish.showModalEdit);
  const { listId } = useParams();

  const EditHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const validDate = WishObjectSchema.omit({ id: true }).parse({
      ...dataForm,
      wishListId: Number(listId),
    });
    console.log(validDate, 'ModalUiWishEdit');

    try {
      if (list?.id !== undefined) {
        await dispatch(updateWish({ wishId: list.id, wishData: validDate }));
      }
    } catch (error) {
      console.error('Error dispatching addWishList:', error);
    }
    dispatch(closeEditModal());
  };
  if (list?.id !== undefined) {
    return (
      <Modal size="small" open={showModalEdit} onClose={() => dispatch(closeEditModal())}>
        <ModalContent>
          <Form onSubmit={EditHandler}>
            <FormField>
              <label>Название подарка</label>
              <input
                name="title"
                defaultValue={list.title}
                placeholder="Введите название вишлиста"
              />
            </FormField>
            <FormField>
              <label>Картинка</label>
              <input name="date" defaultValue={list.date} type="date" />
            </FormField>

            

            <ModalActions style={{ marginTop: '20px' }}>
              <Button color="google plus" onClick={() => dispatch(closeEditModal())}>
                Вернуться к подаркам
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
  return <></>;
}
