import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import Card from './Card';
import uuid from 'react-native-uuid';
import Button from './Button';

export default function List({
  list,
  listIndex,
  lists,
  setLists,
}: {
  list: any;
  listIndex: number;
  lists: any[];
  setLists: (lists: any[]) => void;
}) {
  const [newCardTitle, setNewCardTitle] = useState('');

  const addCard = () => {
    if (!newCardTitle.trim()) return;
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.push({
      id: uuid.v4(),
      title: newCardTitle,
      description: '',
      dueDate: null,
    });
    setLists(updatedLists);
    setNewCardTitle('');
  };

  const deleteList = () => {
    const updated = lists.filter((_, i) => i !== listIndex);
    setLists(updated);
  };

  return (
    <View style={styles.list}>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>{list.title}</Text>
      </View>
      <FlatList
        data={list.cards}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Card
            card={item}
            listIndex={listIndex}
            cardIndex={index}
            lists={lists}
            setLists={setLists}
          />
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="New card title"
        value={newCardTitle}
        onChangeText={setNewCardTitle}
      />
      <Button title="Add Card" onPress={addCard} />
      <Button title="Delete List" color="red" onPress={deleteList} style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f4f5f7',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  titleContainer: {
    marginVertical: 15,
    paddingVertical: 5,
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});
