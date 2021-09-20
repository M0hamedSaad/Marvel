import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  I18nManager,
  ActivityIndicator,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../../utils';
import { translate } from '../../i18n';

import Right from '../../assets/images/arrow-right.svg'
import Left from '../../assets/images/arrow-left.svg'
import StarFill from '../../assets/images/star-filled.svg'
import StarEmpty from '../../assets/images/empty-star.svg'
import Heart from '../../assets/images/heart.svg'
import { useGet } from '../../services/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../../redux/actions';
import { useNavigation } from '@react-navigation/core';
const limit = 6;

const { width: screenWidth } = Dimensions.get('window');

export const MyCarousel = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const characters = useSelector(state => state.charactersState?.characters);
  const numOfStars = [0, 1, 2, 3, 4]
  const [stars, setStars] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true)

  //call get characters
  useEffect(() => {
    get_Characters()
  }, [offset])

  //call dispatch action characters
  const get_Characters = async () => {
    setLoading(true)
    const { result } = await useGet('/characters', undefined, { limit, offset })
    await dispatch(await getCharacters(result))
    setLoading(false)
  }
  //increment page
  const pagination = () => {
    setOffset(offset + 1)
  }

  const carouselRef = useRef(null);
  const goForward = () => { carouselRef.current.snapToNext() };//go forward
  const goPrev = () => { carouselRef.current.snapToPrev() };//go next

  // Stars action
  const rate = (indexOfCard, indexOfStar) => {
    // console.log({ indexOfCard, indexOfStar });
    setStars(indexOfStar)
    setSelectedIndex(indexOfCard)
  }

  const goToDetails = (item) => {
    navigation.navigate('Details', { item })
  }

  //ParallaxImage Card
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => goToDetails(item)}
        style={styles.item} key={index}>

        <ParallaxImage
          source={{ uri: item?.thumbnail?.path + '.' + item?.thumbnail?.extension }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

        <TouchableOpacity style={styles.fav} >
          <Heart />
        </TouchableOpacity>

        <View style={styles.cardDetails}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {numOfStars.map((star, indexStar) => {
              return (
                <TouchableOpacity key={indexStar} onPress={() => { rate(index, indexStar) }}>
                  {indexStar <= stars && index == selectedIndex ?
                    <StarFill style={{ marginRight: 5 }} /> :
                    <StarEmpty style={{ marginRight: 5 }} />}
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.title} numberOfLines={2}>{item?.name}</Text>
            {item?.description != '' && <Text style={styles.desc} numberOfLines={4}>{'\n' + item?.description} </Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    loading && offset == 0 ? <ActivityIndicator color={COLORS.SECONDARY} /> :
      <View style={styles.container}>
        <View style={styles.rowController}>
          {/**Title */}
          <Text style={styles.charTitle}>{translate('characters')}</Text>
          {/**arrows */}
          <View style={styles.simpleRow}>
            <TouchableOpacity onPress={goPrev}>
              <Left />
            </TouchableOpacity>

            {loading && offset > 0 ?
              <ActivityIndicator color={COLORS.SECONDARY} style={{ marginHorizontal: 2 }} /> :
              <Text style={styles.space} />}

            <TouchableOpacity onPress={goForward}>
              <Right />
            </TouchableOpacity>
          </View>
        </View>

        <Carousel
         // extraData={characters}
          keyExtractor={(item, index) => 'key' + index.toString()}
          ref={carouselRef}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 60}
          data={characters}
          renderItem={renderItem}
          hasParallaxImages={true}
          onEndReached={pagination}
        />
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 20 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowController: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginBottom: hp(3)
  },
  space: {
    paddingHorizontal: 12
  },
  title: {
    fontSize: hp(2),
    color: COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    width: '100%'
  },
  desc: {
    fontSize: hp(1.8),
    color: COLORS.WHITE,
    fontFamily: FONTS.LIGHT,
    width: '100%'
  },
  cardDetails: {
    width: '90%',
    position: 'absolute',
    bottom: hp(5),
    left: I18nManager.isRTL ? null : wp(5),
    right: I18nManager.isRTL ? wp(5) : null

  },
  fav: {
    position: 'absolute',
    right: wp(3),
    top: hp(2)
  },
  descContainer: {
    width: '100%',
    backgroundColor: COLORS.LIGHT + 95,
    borderRadius: 10,
    padding: 5
  },
  charTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontSize: hp(2)
  },
});