import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import List from './List';
import AddListButton from './AddListButton';

type listProps = {
  id: string;
  title: string;
  cards: any[];
};

export default function Board({ lists, setLists }: { lists: any[], setLists: (lists: listProps[]) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.board}>
        {lists.map((list: any, index: number) => (
          <List key={list.id} list={list} listIndex={index} lists={lists} setLists={setLists} />
        ))}
        <AddListButton setLists={setLists} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    padding: 10,
  },
});
