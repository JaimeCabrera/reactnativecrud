import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

interface Props {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
}

export const AlertDialog = ({showDialog, setShowDialog}: Props) => {
  return (
    <>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
