import React, { useState } from 'react';
import { View,  TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import uuid from 'react-native-uuid';
import Button from './Button';

type listProps = {
  id: string;
  title: string;
  cards: any[];
};


export default function AddListButton({
  setLists,
}: {
  setLists: (lists: listProps[]) => void;
}) {
  const [title, setTitle] = useState('');

  const addList = () => {
    if (!title.trim()) return;
    setLists((prev: listProps[]) => [...prev, { id: uuid.v4(), title, cards: [] }]);
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="List title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button onPress={addList} title="Add List" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#dfe1e6',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});
