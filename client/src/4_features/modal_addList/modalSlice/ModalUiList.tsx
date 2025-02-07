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

import { useAppDispatch, useAppSelector } from '../../../1_app/store/hooks';

import { addWishList } from '../../../5_entities/wishlist/lib/wishListThunk';
import { WishListObjectSchema } from '../../../5_entities/wishlist/types/types';
import {
  closeModal,
  closeTomorrowDate,
  openTomorrowDate,
} from '../../../5_entities/modal_window/modalSlice';

export default function ModalUiList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.modal.showModal);
  const user = useAppSelector((state) => state.user.data);

  const tomorrowDate = useAppSelector((state) => state.modal.tomorrowDate);

  const addHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
      await dispatch(addWishList(validDate));
      dispatch(closeModal());
      dispatch(closeTomorrowDate());
    } catch (error) {
      console.error('Error dispatching addWishList:', error);
    }
  };

  return (
    <Modal size="small" open={showModal} onClose={() => dispatch(closeModal())}>
      <ModalContent>
        <Form onSubmit={addHandler}>
          <FormField>
            <label style={{ fontSize: 'large' }}>Название вишлиста</label>
            <input name="title" placeholder="День рождения/свадьба/8марта..." />
          </FormField>
          <FormField>
            <label style={{ fontSize: 'large' }}>Дата мероприятия</label>
            <input name="date" type="date" />
          </FormField>
          {tomorrowDate && (
            <Message color="red">Дата не можеть быть раньше сегодняшнего дня</Message>
          )}
          <ModalActions style={{ marginTop: '20px' }}>
            <Button color="black" onClick={() => dispatch(closeModal())}>
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
