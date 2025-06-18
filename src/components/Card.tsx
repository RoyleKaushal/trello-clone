import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import Button from './Button';

export default function Card({
  card,
  listIndex,
  cardIndex,
  lists,
  setLists,
}: {
  card: any;
  listIndex: number;
  cardIndex: number;
  lists: any[];
  setLists: (lists: any[]) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDesc, setEditDesc] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  const updateCard = () => {
    const updatedLists = [...lists];
    const updatedCard = {
      ...card,
      title: editTitle,
      description: editDesc,
      dueDate,
    };
    updatedLists[listIndex].cards[cardIndex] = updatedCard;
    setLists(updatedLists);
    setModalVisible(false);
  };

  const deleteCard = () => {
    const updated = [...lists];
    updated[listIndex].cards.splice(cardIndex, 1);
    setLists(updated);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.card}
      >
        <Text>{card.title}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            placeholder="Title"
            style={styles.input}
          />
          <TextInput
            value={editDesc}
            onChangeText={setEditDesc}
            placeholder="Description"
            style={styles.input}
          />
          <TextInput
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="Due Date (optional)"
            style={styles.input}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Button
              title="Update"
              onPress={updateCard}
              style={{ flex: 1, marginEnd: 5 }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={deleteCard}
              style={{ flex: 1, marginStart: 5 }}
            />
          </View>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  modal: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
});
