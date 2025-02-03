import React, { useRef, useState } from 'react';
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
import { closeUserModal } from '../../5_entities/modal_window/model/modalSlice';
import style from './Modal.module.scss';

export default function ModalPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showUserModal = useAppSelector((state) => state.modal.showUserModal);
  const data = useAppSelector((state) => state.user.data)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<string | null>(data?.avatar ?? null);

  const handleImageClick = (): void => {
    fileInputRef.current?.click(); // Открываем диалог выбора файла
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Обновляем аватар
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal size="small" open={showUserModal} onClose={() => dispatch(closeUserModal())}>
      <ModalHeader>Личный кабинет</ModalHeader>
      <ModalContent>
        <Form>
          <div>
            <Image
              htmlFor="upload"
              onClick={handleImageClick} // Обработчик клика
              style={{ cursor: 'pointer' }}
              className={style.avatar}
              src={avatar ?? '/HomerSimpson.webp'}
            />
            <input
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              id="upload"
              className={style.addFoto}
              type="file"
              name="file"
            />
          </div>
          <FormField>
            <label>Имя пользователя</label>
            <input name="name" type="text" defaultValue={data?.name} />
          </FormField>
          <FormField>
            <label>Номер телефона</label>
            <input name="phoneNumber" type="text" defaultValue={data?.phoneNumber} />
          </FormField>
          <FormField>
            <label>Ваша дата рождения</label>
            <input name="birthday" type="date" defaultValue={data?.birthday} />
          </FormField>
          <ModalActions style={{ marginTop: '20px' }}>
            <Button onClick={() => dispatch(closeUserModal())}>Вернуться</Button>
            <Button type="submit">Сохранить</Button>
          </ModalActions>
        </Form>
      </ModalContent>
    </Modal>
  );
}
