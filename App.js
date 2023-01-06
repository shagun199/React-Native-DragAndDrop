/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */

import * as React from "react";
import { StyleSheet, View , Text , Dimensions } from "react-native";
import { useState } from "react";
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const gesturRootViewStyle = { flex : 1 };

function App(){

  const DraggableList = [
    {
      "id": 1,
      "name": "A",
      "background_color": "red"
    },
    {
      "id": 2,
      "name": "B",
      "background_color": "orange"
    },
    {
      "id": 3,
      "name": "C",
      "background_color": "yellow"
    },
    {
      "id": 4,
      "name": "D",
      "background_color": "blue"
    },
    {
      "id": 5,
      "name": "E",
      "background_color": "green"
    },
    {
      "id": 6,
      "name": "F",
      "background_color": "pink"
    },
    {
      "id": 7,
      "name": "G",
      "background_color": "red"
    },
    {
      "id": 8,
      "name": "H",
      "background_color": "blue"
    },
    {
      "id": 9,
      "name": "I",
      "background_color": "green"
    },
    {
      "id": 10,
      "name": "J",
      "background_color": "pink"
    },
    {
      "id": 11,
      "name": "K",
      "background_color": "yellow"
    },
    {
      "id": 1,
      "name": "L",
      "background_color": "red"
    }
 ]
 const FirstReceivingItemList = [
    {
      "id": 13,
      "name": "M",
      "background_color": '#ffaaff'
    },
    {
      "id": 14,
      "name": "N",
      "background_color": '#ffaaff'
    },
    {
      "id": 15,
      "name": "O",
      "background_color": '#ffaaff'
    },
    {
      "id": 16,
      "name": "P",
      "background_color": '#ffaaff'
    }
  ];

  const [draggableList, setDraggableList] = useState(DraggableList)
  const [recievingList, setReceivingList] = useState(FirstReceivingItemList)

  const DragUIComponent = ({ item, index }) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.draggableBox, { backgroundColor: item.background_color }]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}
      >
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  }

  const ReceivingZoneUIComponent = ({item, index}) =>{
    return(
      <DraxView 
        style={[styles.centeredContent, styles.receivingZone, { backgroundColor: item.background_color }]}
        receivingStyle={styles.receiving}

        renderContent = {({viewState}) => {
          const recievingDrag = viewState && viewState.recievingDrag;
          const payload = recievingDrag && recievingDrag.payload;
          
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}    
        key = {index}
        onReceiveDragDrop = {(event) => {
            const selected_item = draggableList[event.dragged.payload];
            const newReceivingList = [...recievingList];
            newReceivingList[index] = selected_item;
            setReceivingList(newReceivingList);

            const newDraggableList = [...draggableList];
            newDraggableList[event.dragged.payload] = recievingList[index];
            setDraggableList(newDraggableList);
        }}
      />
      );
  }

  const FlatListItemSeperator = () => {
    return (
      <View style={styles.flatListItemSeperator} />
    );
  }

  return (

    <GestureHandlerRootView style= {gesturRootViewStyle}>
    <View>
      <Text style = {styles.headerStyle}> Drag and Drop</Text>
    </View>
    <DraxProvider>
      <View style = {styles.container}>
        <View style = {styles.receivingContainer}>
          {recievingList.map((item,index) => ReceivingZoneUIComponent({item,index}))}
        </View>
        <View styles = {styles.draxListContainer}>
          <DraxList 
            data = {draggableList}
            renderItemContent = {DragUIComponent}
            keyExtractor = {(item,index) => index.toString()}
            numColumns = {4}
            ItemSeparatorComponent = {FlatListItemSeperator}
            scrollEnabled = {true}  
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
    height: (Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    width: (Dimensions.get('window').width / 4) - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {
    width: (Dimensions.get('window').width / 4) - 12,
    height: (Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5
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
    justifyContent: 'space-evenly'
  },
  itemSeparator: {
    height: 15
  },
  draxListContainer: {
    padding: 5,
    height: 200,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100
  },
  textStyle: {
    fontSize: 18
  },
  headerStyle: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign : 'center',
  }
})

export default App