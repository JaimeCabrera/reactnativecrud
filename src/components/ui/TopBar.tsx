import React from 'react';
import {Button, useTheme} from 'react-native-paper';

export const TopBar = ({navigation}: any) => {
  const {colors} = useTheme();

  const handlePress = () => {
    navigation.navigate('client-add');
  };
  return (
    <>
      <Button
        icon="plus-circle-outline"
        mode="text"
        color={colors.surface}
        onPress={() => handlePress()}>
        Cliente
      </Button>
    </>
  );
};
