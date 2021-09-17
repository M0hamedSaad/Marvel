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
const limit = 5;

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const { width: screenWidth } = Dimensions.get('window');

export const MyCarousel = props => {
  const [entries, setEntries] = useState([]);

  const numOfStars = [0, 1, 2, 3, 4]
  const [stars, setStars] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [offset, setOffset] = useState(0);


  useEffect(() => {
    useGet('/characters', undefined, { limit, offset })
  }, [offset])

  const pagination = () => {
    setOffset(offset + 1)
  }

  const carouselRef = useRef(null);

  const goForward = () => { carouselRef.current.snapToNext() };

  const goPrev = () => { carouselRef.current.snapToPrev() };

  const rate = (indexOfCard, indexOfStar) => {
    // console.log({ indexOfCard, indexOfStar });
    setStars(indexOfStar)
    setSelectedIndex(indexOfCard)
  }

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
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
                <TouchableOpacity onPress={() => { rate(index, indexStar) }}>
                  {indexStar <= stars && index == selectedIndex ?
                    <StarFill style={{ marginRight: 5 }} /> :
                    <StarEmpty style={{ marginRight: 5 }} />}
                </TouchableOpacity>
              )
            })}
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {'item?.name' + '\n'}
          </Text>

          <Text style={styles.desc} numberOfLines={4} >
            {'item?.description'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowController}>
        {/**Title */}
        <Text style={{
          color: COLORS.WHITE,
          fontFamily: FONTS.REGULAR,
          fontSize: hp(2)
        }}>{translate('characters')}</Text>
        {/**arrows */}
        <View style={styles.simpleRow}>
          <TouchableOpacity onPress={goPrev}>
            <Left />
          </TouchableOpacity>
          <Text style={styles.space} />
          <TouchableOpacity onPress={goForward}>
            <Right />
          </TouchableOpacity>
        </View>
      </View>


      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
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
    paddingHorizontal: 10
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
  }
});