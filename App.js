import * as React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';

const gestureRootViewStyle = {flex: 1};

export default function App() {
  const draggableItemList = [
    {
      id: 9,
      name: 'M',
      background_color: 'red',
    },
    {
      id: 10,
      name: 'N',
      background_color: 'pink',
    },
    {
      id: 11,
      name: 'O',
      background_color: 'orange',
    },
    {
      id: 12,
      name: 'P',
      background_color: '#aaaaff',
    },
  ];
  const FirstReceivingItemList = [
    {
      id: 13,
      name: 'M',
      background_color: '#ffaaff',
    },
    {
      id: 14,
      name: 'N',
      background_color: '#ffaaff',
    },
    {
      id: 15,
      name: 'O',
      background_color: '#ffaaff',
    },
    {
      id: 16,
      name: 'P',
      background_color: '#ffaaff',
    },
  ];

  const [receivingItemList, setReceivedItemList] = React.useState(
    FirstReceivingItemList,
  );
  const [dragItemMiddleList, setDragItemListMiddle] =
    React.useState(draggableItemList);

  const DragUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[
          styles.centeredContent,
          styles.draggableBox,
          {backgroundColor: item.background_color},
        ]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[
          styles.centeredContent,
          styles.receivingZone,
          {backgroundColor: item.background_color},
        ]}
        receivingStyle={styles.receiving}
        renderContent={({viewState}) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={event => {
          let selected_item = dragItemMiddleList[event.dragged.payload];
          let replaced_item = receivingItemList[index];

          console.log('replaced_item', {replaced_item});
          if (selected_item.name === replaced_item.name) {
            console.log('The elements are same');
            let newReceivingItemList = [...receivingItemList];

            console.log(
              'onReceiveDragDrop :: newReceivingItemList',
              newReceivingItemList,
            );
            newReceivingItemList[index] = selected_item;
            setReceivedItemList(newReceivingItemList);

            let newDragItemMiddleList = dragItemMiddleList.filter(
              (element, index) => index !== event.dragged.payload,
            );

            setDragItemListMiddle(newDragItemMiddleList);
            // console.log(
            //   'onReceiveDragDrop :: newDragItemMiddleList 1',
            //   newDragItemMiddleList,
            // );
            // // newDragItemMiddleList[event.dragged.payload] =
            // //   receivingItemList[index];
            // console.log(
            //   'onReceiveDragDrop :: newDragItemMiddleList 2',
            //   newDragItemMiddleList,
            // );
            // setDragItemListMiddle(newDragItemMiddleList);
          } else {
            return false;
          }
          console.log('onReceiveDragDrop::index', selected_item, index);
          console.log('onReceiveDragDrop :: payload', event.dragged.payload);
        }}
        onRejectDrop={event => {
          // move the dragged item back to its original position
          const draggedItem = dragItemMiddleList[event.dragged.payload];
          const newList = [...dragItemMiddleList];
          newList[event.dragged.payload] = draggedItem;
          setDragItemListMiddle(newList);
        }}
      />
    );
  };

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <View>
        <Text style={styles.headerStyle}>
          {'Drag drop and swap between lists'}
        </Text>
      </View>
      <DraxProvider>
        <View style={styles.container}>
          <View style={styles.receivingContainer}>
            {receivingItemList.map((item, index) =>
              ReceivingZoneUIComponent({item, index}),
            )}
          </View>
          <View style={styles.draxListContainer}>
            <DraxList
              data={dragItemMiddleList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              ItemSeparatorComponent={FlatListItemSeparator}
              scrollEnabled={true}
            />
          </View>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    justifyContent: 'space-evenly',
  },
  centeredContent: {
    borderRadius: 10,
  },
  receivingZone: {
    height: Dimensions.get('window').width / 4 - 12,
    borderRadius: 10,
    width: Dimensions.get('window').width / 4 - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {
    width: Dimensions.get('window').width / 4 - 12,
    height: Dimensions.get('window').width / 4 - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemSeparator: {
    height: 15,
  },
  draxListContainer: {
    padding: 5,
    height: 200,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100,
  },
  textStyle: {
    fontSize: 18,
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
