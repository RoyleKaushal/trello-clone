import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
// import Board from './components/Board';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from './src/components/Board';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddListModal from './src/components/AddListModal';

type listProps = {
  id: string;
  title: string;
  cards: any[];
};

export default function App() {
  const [lists, setLists] = useState<listProps[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const resetBoard = async () => {
    await AsyncStorage.removeItem('trelloBoard');
    setLists([]);
  };

  useEffect(() => {
    AsyncStorage.getItem('trelloBoard').then((data: any) => {
      if (data) setLists(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('trelloBoard', JSON.stringify(lists));
  }, [lists]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Trello Clone</Text>
          <Button title="Reset Board" onPress={resetBoard} />
          {lists.length !== 0 && (
            <Button
              title="Add List"
              onPress={() =>
                setModalVisible(true)
              }
            />
          )}
        </View>
        <Board lists={lists} setLists={setLists} />
        <AddListModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setLists={setLists}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
});
