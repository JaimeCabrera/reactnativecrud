import axios from 'axios';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Headline, Subheading, Text} from 'react-native-paper';
import globalStyles from '../styles/global';

export const ClientDetailsScreen = ({navigation, route}: any) => {
  const {id, name, telephone, email, company} = route.params.item;
  const {setGetApiData} = route.params;
  // show alert to dlete client details
  const showDeleteConfirmation = () => {
    Alert.alert(
      '¿Deseas Eliminar este cliente?',
      'Una vez eliminado no podras recuperarlo',
      [
        {text: 'Si, Eliminar', onPress: () => deleteClient()},
        {text: 'Cancelar', style: 'destructive'},
      ],
    );
  };
  const deleteClient = async () => {
    try {
      const url = `http://10.0.2.2:3000/clientes/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    // redireccionar
    navigation.navigate('home');
    // refrescar los datos de la api
    setGetApiData(true);
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.h1}>{name}</Headline>
      <Text style={styles.text}>
        Empresa: <Subheading>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        Email: <Subheading>{email}</Subheading>
      </Text>
      <Text style={styles.text}>
        Telefono: <Subheading>{telephone}</Subheading>
      </Text>
      <Button
        style={styles.btnDelete}
        mode="contained"
        icon="cancel"
        onPress={() => showDeleteConfirmation()}>
        Eliminar cliente
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
  btnDelete: {
    marginTop: 50,
    backgroundColor: '#CD6155',
  },
});
