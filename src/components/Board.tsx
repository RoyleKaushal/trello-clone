import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import List from './List';
import AddListButton from './AddListButton';
import DraggableFlatList, {
  NestableScrollContainer,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

type listProps = {
  id: string;
  title: string;
  cards: any[];
};

export default function Board({
  lists,
  setLists,
}: {
  lists: any[];
  setLists: (lists: listProps[]) => void;
}) {
  const setUpdatedData = (data: any) => {
    setLists(data);
  };
  return (
   
      <View style={styles.board}>
        <DraggableFlatList
          data={lists}
          onDragEnd={({ data }) => setUpdatedData(data)}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          // @ts-ignore
          horizontal
          renderItem={({
            item,
            getIndex,
            drag,
            isActive,
          }: RenderItemParams<any>) => {
            let index = getIndex();
            return (
              <List
                drag={drag}
                isActive={isActive}
                key={item.id}
                list={item}
                listIndex={index}
                lists={lists}
                setLists={setLists}
              />
            );
          }}
        />
        {/* {lists.map((list: any, index: number) => (
          <List key={list.id} list={list} listIndex={index} lists={lists} setLists={setLists} />
        ))} */}
        {lists.length === 0 && <AddListButton setLists={setLists} />}
      </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
});
