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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export default function Card({
  card,
  listIndex,
  cardIndex,
  lists,
  setLists,
  drag,
  isActive,
}: {
  card: any;
  listIndex: number;
  cardIndex: number;
  lists: any[];
  setLists: (lists: any[]) => void;
  drag?: () => void;
  isActive?: boolean;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDesc, setEditDesc] = useState(card.description || '');

  const updateCard = () => {
    const updatedLists = [...lists];
    const updatedCard = {
      ...card,
      title: editTitle,
      description: editDesc,
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
        onLongPress={() => drag?.()}
        style={styles.card}
      >
        <Text>{card.title}</Text>
      </TouchableOpacity>

     {modalVisible && <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '90%',
            }}
          >
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
            <Button title="Close" onPress={() => {
              setModalVisible(false)
            }} />
          </View>
        </View>
      </Modal>}
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
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
});
