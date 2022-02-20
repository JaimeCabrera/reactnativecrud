import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, TextInput, useTheme} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
import {AlertDialog} from '../components/AlertDialog';
import {InterfaceClients} from './HomeScreen';

export interface Props {
  navigation: any;
  route: InterfaceRoute;
}

interface InterfaceRoute {
  params: InterfaceParams;
}
interface InterfaceParams {
  client: InterfaceClients;
  setGetApiData: (value: boolean) => void;
}

export const NewClientScreen = ({navigation, route}: Props) => {
  const {setGetApiData} = route.params;
  const {colors} = useTheme();
  // state to form
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  // state to dialog
  const [showDialog, setShowDialog] = useState(false);
  // HOOK DE NAVIAGTION

  // detectar si estamos editando o no
  useEffect(() => {
    if (route.params.client) {
      // obteniendo los datos del client desde los parametros
      const {
        name: nameEdit,
        telephone: telephoneEdit,
        email: emailEdit,
        company: companyEdit,
      } = route.params.client;
      setName(nameEdit);
      setTelephone(telephoneEdit);
      setEmail(emailEdit);
      setCompany(companyEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save client in database
  const saveClient = async () => {
    // data validation
    if (
      name.trim() === '' ||
      telephone.trim() === '' ||
      email.trim() === '' ||
      company.trim() === ''
    ) {
      setShowDialog(true);
      return;
    }
    // create a client
    const client = {id: '', name, telephone, email, company};
    // si estamos editandoel client
    if (route.params.client) {
      const {id} = route.params.client;
      client.id = id;
      const url = `http://10.0.2.2:3000/clientes/${id}`;
      try {
        await axios.put(url, client);
        setGetApiData(true);
        navigation.navigate('home');
      } catch (error) {
        console.log(error);
      }
    } else {
      // guardar el cliente en la api
      try {
        await axios.post('http://10.0.2.2:3000/clientes', client);
        setGetApiData(true);
        navigation.navigate('home');
        // redireccionar
        // navigation.navigate('home');
        // setGetApiData(true);
      } catch (error) {
        console.log(error);
      }
    }

    // limpinado los campos del form de
    setName('');
    setTelephone('');
    setEmail('');
    setCompany('');
  };
  return (
    <View style={globalStyles.container}>
      <TextInput
        style={styles.input}
        theme={{roundness: 4}}
        outlineColor={colors.disabled}
        activeOutlineColor={colors.backdrop}
        mode="outlined"
        label="Nombre"
        placeholder="Jhon Doe"
        dense={true}
        value={name}
        onChangeText={txt => setName(txt)}
        right={<TextInput.Affix text="/150" />}
      />
      <TextInput
        style={styles.input}
        theme={{roundness: 4}}
        outlineColor={colors.disabled}
        activeOutlineColor={colors.backdrop}
        mode="outlined"
        dense={true}
        onChangeText={txt => setTelephone(txt)}
        label="Teléfono"
        placeholder="091502596"
        value={telephone}
        right={<TextInput.Affix text="/10" />}
      />
      <TextInput
        style={styles.input}
        theme={{roundness: 4}}
        outlineColor={colors.disabled}
        activeOutlineColor={colors.backdrop}
        mode="outlined"
        dense={true}
        label="Correo"
        placeholder="email@email.com"
        value={email}
        onChangeText={txt => setEmail(txt)}
        right={<TextInput.Affix text="/150" />}
      />
      <TextInput
        style={styles.input}
        theme={{roundness: 4}}
        outlineColor={colors.disabled}
        activeOutlineColor={colors.backdrop}
        mode="outlined"
        dense={true}
        value={company}
        label="Nombre Empresa"
        placeholder="Empresa ..."
        onChangeText={txt => setCompany(txt)}
        right={<TextInput.Affix text="/150" />}
      />
      <Divider />
      <Button
        icon="content-save"
        mode="outlined"
        onPress={() => saveClient()}
        labelStyle={{color: colors.onSurface}}
        color={colors.primary}>
        Guardar cliente
      </Button>
      <AlertDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 14,
  },
});
