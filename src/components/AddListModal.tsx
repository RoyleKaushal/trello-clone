import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import uuid from 'react-native-uuid';
import Button from './Button';

type listProps = {
  id: string;
  title: string;
  cards: any[];
};

export default function AddListModal({
  modalVisible,
  setModalVisible,
  setLists,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setLists: (lists: listProps[]) => void;
}) {
  const [title, setTitle] = useState('');

  const addList = () => {
    if (!title.trim()) return;
    setLists((prev: listProps[]) => [
      ...prev,
      { id: uuid.v4() as string, title, cards: [] },
    ]);
    setTitle('');
    setModalVisible(false);
  };

  return (
    <>
     

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New List</Text>
            <TextInput
              placeholder="List title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <Button onPress={addList} title="Add List" />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  openButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 6,
  },
  cancelText: {
    color: '#ff3b30',
    marginTop: 10,
    textAlign: 'center',
  },
});
