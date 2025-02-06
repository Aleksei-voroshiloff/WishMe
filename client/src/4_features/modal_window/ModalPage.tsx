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
  Message,
} from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../1_app/store/hooks';
import {
  closeDangerDate,
  closeTomorrowDate,
  closeUserModal,
  openDangerDate,
  openTomorrowDate,
  setAvatar,
} from '../../5_entities/modal_window/modalSlice';
import style from './Modal.module.scss';
import { updateUserInfo } from '../../5_entities/user/lib/userThunks';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import InputMask, { Props as InputMaskProps } from 'react-input-mask';
type InputProps = InputMaskProps & React.InputHTMLAttributes<HTMLInputElement>;


export default function ModalPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showUserModal = useAppSelector((state) => state.modal.showUserModal);
  const user = useAppSelector((state) => state.user.myCabinet);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatar = useAppSelector((state) => state.modal.avatar);
  const showDate = useAppSelector((state) => state.modal.showDate);
  const tomorrowDate = useAppSelector((state) => state.modal.tomorrowDate);

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
      const data = formData.get('birthday') as string;
      const inputDate = new Date(data);
      // Получаем текущую дату
      const today = new Date();
      // Сбрасываем время для корректного сравнения
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      // Проверяем, введена ли дата позже текущей
      if (inputDate > today) {
        dispatch(openTomorrowDate());
        return;
      }
      if (!data) {
        dispatch(openDangerDate());
        return;
      }
      if (user?.id !== undefined) {
        await dispatch(updateUserInfo({ id: user.id, updateData: formData }));
      }
      dispatch(closeUserModal());
      dispatch(closeTomorrowDate());
      dispatch(closeDangerDate());
    } catch (error) {
      console.error(error, 'Ошибка в обновлении');
    }
  };

  const noFoto = '/avatar.png';

  if (!user) return <></>;
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
            {user.avatar || avatar ? (
              <Image
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
                className={style.avatar}
                src={avatar ?? `http://localhost:3000/${user.avatar ?? ''}`}
              />
            ) : (
              <Image
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
                className={style.avatar}
                src={noFoto}
              />
            )}
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
            <InputMask
              mask="+7\ (999) 999-99-99"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
              placeholder="+7 (___) ___-__-__"
            >
              {(inputProps: InputProps) => <input {...inputProps} type="text" />}
            </InputMask>
          </FormField>
          <FormField>
            <label>Ваша дата рождения</label>
            <input name="birthday" type="date" defaultValue={user.birthday ?? ''} />
            {showDate && <Message color="red">Укажите дату рождения</Message>}
            {tomorrowDate && (
              <Message color="red">Дата не можеть быть позднее сегодняшнего дня</Message>
            )}
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
}
