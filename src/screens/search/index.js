import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { Header } from '../../components';
import { useGet } from '../../services/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import * as Animatable from "react-native-animatable";
import { getSearch } from '../../redux/actions';
import { COLORS } from '../../utils';
import FastImage from 'react-native-fast-image';
import Sad from '../../assets/images/sad.svg'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const { createAnimatableComponent } = Animatable;
const AnimatableView = createAnimatableComponent(View);
const limit = 10

const Search = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchResult = useSelector(state => state.searchState?.searchResult);
  const username = route?.params?.username
  const searchInput = route?.params?.searchInput

  const [searchTxt, setSearchTxt] = useState(searchInput); // search text 
  const [offset, setOffset] = useState(0); // num of page
  const [loading, setLoading] = useState(true) // loading flag
  const [data, setData] = useState(searchResult) //result data
  const [totalResults, setTotal] = useState(0) // total results

  //call redux action
  const searching = async (nameStartsWith, newSearch) => {
    setSearchTxt(nameStartsWith)
    if (newSearch) { setData(null); setOffset(0); setLoading(false) }
    if (nameStartsWith) {
      setLoading(true)
      const { result, total } = await useGet('/characters', undefined, { limit, offset, nameStartsWith })
      setTotal(total)
      await dispatch(await getSearch(result))
      setLoading(false)
    }
  }

  //redux search result into state 
  useEffect(() => {
    setData(searchResult)
  }, [searchResult])

  //call when page changed
  useEffect(() => {
    searching(searchTxt)
  }, [offset])

  //increment page
  const pagination = () => {
    data.length < totalResults ?
      setOffset(offset + 1) : null
  }

  const goToDetails = (item) => {
    navigation.navigate('Details', { item })
  }

  //render card item
  const renderItem = ({ item, index }) => {
    return (
      <AnimatableView key={String(item.id)}
        animation={index % 2 == 0 ? 'slideInLeft' : "slideInRight"}
        delay={parseInt(index.toString()[index.toString().length - 1]) * 50}
        style={styles.cardContainer} >

        <TouchableOpacity onPress={() => goToDetails(item)} style={styles.cardPress}>
          <FastImage
            style={styles.image}
            source={{ uri: item?.thumbnail?.path + '.' + item?.thumbnail?.extension }} />

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}> {item?.name} </Text>
            {item?.description != '' && <Text style={styles.desc} numberOfLines={4} >{'\n' + item?.description} </Text>}
          </View>
        </TouchableOpacity>
      </AnimatableView>
    )
  }
  return (
    <SafeAreaView style={styles.container} >
      <Header username={username} searching={searching} defaultValue={searchInput} />
      {loading && offset == 0 && searchTxt ? <ActivityIndicator color={COLORS.SECONDARY} /> :
        data?.length > 0 ?
          <FlatList
            nestedScrollEnabled
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            numColumns={2}
            key={2}
            keyExtractor={(item, index) => item.id.toString() + index.toString()}
            onEndReached={pagination}
            ListFooterComponent={() => {
              return (
                loading && offset > 0 ? <ActivityIndicator color={COLORS.SECONDARY} /> : null
              )
            }}/>
          :
          <View style={styles.noResultContainer}>
            <Sad width={wp(40)} height={wp(40)} />
            <Text style={styles.noResult}> {'NO RESULTS.'}</Text>
          </View>
      }
    </SafeAreaView>
  );
};

export default Search;
