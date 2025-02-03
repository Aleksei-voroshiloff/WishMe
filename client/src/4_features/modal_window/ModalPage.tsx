import React from 'react';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Form,
  FormField,
  FormTextArea,
} from 'semantic-ui-react';

export default function ModalPage(): React.JSX.Element {
  return (
    // <Modal size="small" open={} onClose={() => dispatch(closeModal())}>
    //   <ModalHeader>Редакция заметки</ModalHeader>
    //   <ModalContent>
    //     <Form>
    //       <FormField>
    //         <label>Название</label>
    //         <input name="title" type="text" defaultValue={note?.title} />
    //       </FormField>
    //       <FormField>
    //         <label>История</label>
    //         <FormTextArea name="text" type="text" defaultValue={note?.text} />
    //       </FormField>
    //       <ModalActions style={{ marginTop: '20px' }}>
    //         <Button negative onClick={() => dispatch(closeModal())}>
    //           Вернуться
    //         </Button>
    //         <Button positive type="submit">
    //           Добавить
    //         </Button>
    //       </ModalActions>
    //     </Form>
    //   </ModalContent>
    // </Modal>
  );
}
