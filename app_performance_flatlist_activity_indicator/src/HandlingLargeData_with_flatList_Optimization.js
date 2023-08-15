import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

let limit = 10;

const HandlingLargeData_with_flatList_Optimization = () => {
  const [data, setData] = useState([]); // API Data

  const [skip, setSkip] = useState(0); // by default 0 skip hoga
  

  const fetchApiData = () => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setData(res.products);
      })
      .catch(() => {
        console.log('Error is coming during fetching');
      });
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      // render Item, jitne bhi flat list kee functions honge unko UseCallBack and Use Memo me wrap krdege, taki performance better ho
      return (
        <View style={styles.renderflatItemStyle}>
          <Image source={{uri: item.thumbnail}} style={styles.imgStyle} />

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <Text>{item.brand}</Text>
            <Text>Rs. {item.price}</Text>
          </View>

          <Text>{item.description}</Text>
        </View>
      );
    },
    [data],
  ); // ye dubara se tab chlega jb data jo hai vo change hoga

  const keyExtractor = useCallback(item => {
    //  key extractor basically unique id dene ke liye
    `${item.id}`;
  });

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{height: 40}}></View>;
  });

  const onEndReached = () => {
    // ye tb trigger hota hai jese hi flat list ki last iitem
    // par jaate hai to ye trigger hojata h function
    /*
    So end reached me logic lgaege, jese hi end reached hoga, 
    api dubara call krwaege but skip ki values ko increase krdgee

    -
    
    */
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  );
};

export default HandlingLargeData_with_flatList_Optimization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  imgStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  renderflatItemStyle: {
    // Shadow for item, go to shadow generator for react native
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});
