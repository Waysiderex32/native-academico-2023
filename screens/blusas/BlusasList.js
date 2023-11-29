import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { Button, Card, Dialog, Divider, FAB, IconButton, Portal, Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlusasList = ({navigation}) => {
  const [blusas, setBlusas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0)

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  function get(){
    AsyncStorage.getItem('blusas').then(res =>{
      res = JSON.parse(res) || []
      setBlusas(res);
    })
  }

  function confirmDelete(i){
    setId(i);
    showDialog()
  }
  function excluir(){
    blusas.splice(id,1);
    AsyncStorage.setItem('blusas', JSON.stringify(blusas));
    get();
    hideDialog();
  }

  useFocusEffect(
    React.useCallback(() => {
      get();
    }, [])
  );

  return (

    <>
    <ScrollView style={{margin: 10}}> 

    <View> 

     {
       blusas.map((item,i) =>(
          <View key={i}> 
         <Card mode='outlined' style={{backgroundColor: '#80A1C1', marginBottom: 10 }}>
            <Card.Content>
            <Text variant="titleLarge">{item.marca}</Text>
                <Text variant="bodyMedium">Quantidade: {item.quantidade}</Text>
                <Text variant="bodyMedium"> Tamanho: {item.tamanho}</Text>
                <Text variant="bodyMedium"> Cor: {item.cor}</Text>
              </Card.Content>
              <Card.Actions>
            <IconButton icon="trash-can" containerColor='#80A1C1'
            iconColor='red' onPress={()=>{confirmDelete(i)}}></IconButton>
            <IconButton
            containerColor='#80A1C1'
            iconColor='white'
            icon="account-edit"
            onPress={() => navigation.push('form-blusas', {id : i, obj : item})}></IconButton>
          </Card.Actions>
          </Card>
          </View>
        ))
      }
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja realmente excluir?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
      </ScrollView>
      <FAB
    icon="plus"
    size="small"
    style={{position: 'absolute', right: 5, bottom: 0, margin: 5}}
    onPress={() => navigation.push('form-blusas')}
  /> 
    </>
  )
}

export default BlusasList