import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Divider, FAB, Headline, List} from 'react-native-paper';
import globalStyles from '../styles/global';

export interface InterfaceClients {
  id: string;
  name: string;
  telephone: string;
  email: string;
  company: string;
}

export const HomeScreen = ({navigation}: any) => {
  const [clients, setClients] = useState<InterfaceClients[]>([]);
  const [getApiData, setGetApiData] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await axios.get('http://10.0.2.2:3000/clientes');
        setClients(res.data);
        setGetApiData(false);
        console.log('consulta');
      } catch (error) {
        console.log(error);
      }
    };
    if (getApiData) {
      getClients();
    }
  }, [getApiData]);

  return (
    <View style={globalStyles.container}>
      <Button
        mode="text"
        icon="plus-circle"
        // onPress={() => navigation.navigate('client-add', {setGetApiData})}
        onPress={() => navigation.navigate('client-add', {...setGetApiData})}>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.h1}>
        {clients.length > 0 ? 'Lista de clientes' : 'Aun no existen clientes'}
      </Headline>
      <Divider style={globalStyles.divider} />
      <FlatList
        data={clients}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            onPress={() => {
              navigation.navigate('client-details', {item});
            }}
            description={item.company}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() => {
          navigation.navigate('client-add', {...setGetApiData});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
    backgroundColor: '#3498DB',
  },
});
