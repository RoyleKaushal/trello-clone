import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Card from './Card';
import uuid from 'react-native-uuid';
import Button from './Button';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

export default function List({
  list,
  listIndex,
  lists,
  setLists,
  drag,
  isActive,
}: {
  list: any;
  listIndex: number;
  lists: any[];
  setLists: (lists: any[]) => void;
  drag: () => void;
  isActive: boolean;
}) {
  const [newCardTitle, setNewCardTitle] = useState('');

  const addCard = () => {
    if (!newCardTitle.trim()) return;
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.push({
      id: uuid.v4(),
      title: newCardTitle,
      description: '',
    });
    setLists(updatedLists);
    setNewCardTitle('');
  };

  const deleteList = () => {
    const updated = lists.filter((_, i) => i !== listIndex);
    setLists(updated);
  };

  const setUpdatedData = (data: any) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards = data;
    setLists(updatedLists);
  };

  return (
    <View style={styles.list}>
      <TouchableOpacity onLongPress={drag} style={{height: 5, width: 30, backgroundColor: '#6495ED', borderRadius: 10, alignSelf: 'center'}}/>
      <View style={{ flex: 1, marginBottom: 80 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.listTitle}>{list.title}</Text>
        </View>

        <DraggableFlatList
          data={list.cards}
          onDragEnd={({ data }) => setUpdatedData(data)}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({
            item,
            getIndex,
            drag,
            isActive,
          }: RenderItemParams<any>) => {
            let index = getIndex();
            return (
              <Card
                drag={drag}
                isActive={isActive}
                card={item}
                listIndex={listIndex}
                cardIndex={index}
                lists={lists}
                setLists={setLists}
              />
            );
          }}
        />
      </View>
      <View style={{ backgroundColor: '#f4f5f7' }}>
        <TextInput
          style={styles.input}
          placeholder="New card title"
          value={newCardTitle}
          onChangeText={setNewCardTitle}
        />
        <Button title="Add Card" onPress={addCard} />
        <Button
          title="Delete List"
          color="red"
          onPress={deleteList}
          style={{ marginTop: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-between',
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
