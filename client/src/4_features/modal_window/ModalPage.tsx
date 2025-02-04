import React, { useRef } from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Form,
  FormField,
  Image,
} from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import { closeUserModal, setAvatar } from '../../5_entities/modal_window/model/modalSlice';
import style from './Modal.module.scss';
import { updateUserInfo } from '../../5_entities/user/lib/userThunks';

export default function ModalPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showUserModal = useAppSelector((state) => state.modal.showUserModal);
  const user = useAppSelector((state) => state.user.myCabinet);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatar = useAppSelector((state) => state.modal.avatar);

  const handleImageClick = (): void => {
    fileInputRef.current?.click(); // Открываем диалог выбора файла
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setAvatar(reader.result as string)); // Обновляем аватар
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      if (user?.id !== undefined) {
        await dispatch(updateUserInfo({ id: user.id, updateData: formData }));
      }
      dispatch(closeUserModal());
    } catch (error) {
      console.error(error, 'Ошибка в обновлении');
    }
  };
  console.log(avatar);
  if (user?.avatar !== undefined)
    return (
      <Modal
        size="small"
        open={showUserModal}
        onClose={() => {
          dispatch(closeUserModal());
        }}
      >
        <ModalHeader>Личный кабинет</ModalHeader>
        <ModalContent>
          <Form onSubmit={updateHandler}>
            <div>
              <Image
                onClick={() => handleImageClick()}
                style={{ cursor: 'pointer' }}
                className={style.avatar}
                src={avatar ?? `http://localhost:3000/${user.avatar}`}
              />
              <input
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className={style.addFoto}
                type="file"
                name="file"
              />
            </div>
            <FormField>
              <label>Имя пользователя</label>
              <input name="name" type="text" defaultValue={user.name} />
            </FormField>
            <FormField>
              <label>Номер телефона</label>
              <input name="phoneNumber" type="text" defaultValue={user.phoneNumber} />
            </FormField>
            <FormField>
              <label>Ваша дата рождения</label>
              <input name="birthday" type="date" defaultValue={user.birthday} />
            </FormField>
            <ModalActions style={{ marginTop: '20px' }}>
              <Button onClick={() => dispatch(closeUserModal())}>Вернуться</Button>
              <Button primary type="submit">
                Сохранить
              </Button>
            </ModalActions>
          </Form>
        </ModalContent>
      </Modal>
    );
  return <></>;
}
