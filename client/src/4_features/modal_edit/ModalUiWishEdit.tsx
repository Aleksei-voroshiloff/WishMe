import React from 'react';

import { ModalContent, ModalActions, Button, Modal, Form, FormField } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { updateWish } from '../../5_entities/wish/lib/wishThunk';
import { WishObjectSchema } from '../../5_entities/wish/types/types';
import { closeEditModal } from '../../5_entities/wish/model/wishSlice';

export default function ModalUiWishEdit(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const wish = useAppSelector((state) => state.wish.wishCard);
  const showModalEdit = useAppSelector((state) => state.wish.showModalEdit);
  const { listId } = useParams();

  const EditHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const validDate = WishObjectSchema.omit({ id: true }).parse({
      ...dataForm,
      wishListId: Number(listId),
    });

    try {
      if (wish?.id !== undefined) {
        await dispatch(updateWish({ wishId: wish.id, wishData: validDate }));
      }
    } catch (error) {
      console.error('Error dispatching addWishList:', error);
    }
    dispatch(closeEditModal());
  };
  if (wish?.id !== undefined) {
    return (
      <Modal size="small" open={showModalEdit} onClose={() => dispatch(closeEditModal())}>
        <ModalContent>
          <Form onSubmit={EditHandler}>
            <FormField>
              <label>Название подарка</label>
              <input
                name="title"
                defaultValue={wish.title}
                placeholder="Введите название подарка"
              />
            </FormField>
            <FormField>
              <label>Картинка</label>
              <input name="file" defaultValue={wish.file} type="text" placeholder="url картинки" />
            </FormField>

            <FormField>
              <label>Ссылка на товар</label>
              <input
                name="wishUrl"
                defaultValue={wish.wishUrl}
                type="url"
                placeholder="Вставьте ссылку"
              />
            </FormField>
            <FormField>
              <label>Цена в рублях</label>
              <input name="price" defaultValue={wish.price} type="number" placeholder="0 ₽" />
            </FormField>

            <ModalActions style={{ marginTop: '20px' }}>
              <Button color="black" onClick={() => dispatch(closeEditModal())}>
                Вернуться к подаркам
              </Button>
              <Button color="green" type="submit">
                Сохранить изменения
              </Button>
            </ModalActions>
          </Form>
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
