import React from 'react';
import {
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Form,
  FormField,
  Message,
} from 'semantic-ui-react';

import { updateWishList } from '../../5_entities/wishlist/lib/wishListThunk';
import { WishListObjectSchema } from '../../5_entities/wishlist/types/types';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { closeEditListModal } from '../../5_entities/wishlist/model/wishListSlice';
import { closeTomorrowDate, openTomorrowDate } from '../../5_entities/modal_window/modalSlice';

export default function ModalEditListUi(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const tomorrowDate = useAppSelector((state) => state.modal.tomorrowDate);
  const showModalEditList = useAppSelector((state) => state.wishlist.showModalEditList);
  const list = useAppSelector((state) => state.wishlist.oneWishList);

  const EditHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const dataForm = Object.fromEntries(new FormData(e.currentTarget));

    const inputDate = new Date(dataForm.date as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня для корректного сравнения

    if (inputDate < today) {
      dispatch(openTomorrowDate());
      return;
    }

    const validDate = WishListObjectSchema.omit({ id: true }).parse({
      ...dataForm,
      userId: user?.id,
    });

    try {
      if (list?.id !== undefined) {
        await dispatch(updateWishList({ wishListId: list.id, wishListData: validDate }));
      }
      dispatch(closeEditListModal());
      dispatch(closeTomorrowDate());
    } catch (error) {
      console.error('Error dispatching addWishList:', error);
    }
  };
  if (list?.id !== undefined) {
    return (
      <Modal size="small" open={showModalEditList} onClose={() => dispatch(closeEditListModal())}>
        <ModalContent>
          <Form onSubmit={EditHandler}>
            <FormField>
              <label>Название вишлиста</label>
              <input
                name="title"
                defaultValue={list.title}
                placeholder="Введите название вишлиста"
              />
            </FormField>
            <FormField>
              <label>Дата мероприятия</label>
              <input name="date" defaultValue={list.date} type="date" />
            </FormField>
            {tomorrowDate && (
              <Message color="red">Дата не можеть быть раньше сегодняшнего дня</Message>
            )}
            <ModalActions style={{ marginTop: '20px' }}>
              <Button color="black" onClick={() => dispatch(closeEditListModal())}>
                Вернуться к подаркам
              </Button>
              <Button color="green" type="submit">
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
