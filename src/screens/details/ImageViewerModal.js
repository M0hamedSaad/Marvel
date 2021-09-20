import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useGet } from '../../services/useGet';
import Logo from '../../assets/images/logo.svg'
export const ImageViewerModal = ({ url, closeModal }) => {


    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([])
    const [data, setData] = useState(null)

    useEffect(() => {
        getImages()
    }, [])


    useEffect(() => {
        console.log({ images });
    }, [images])

    const getImages = async () => {
        setLoading(true)
        const { result } = await useGet(undefined, undefined, undefined, url)
        setData(result)
        let images = []
        result[0]?.images?.map(item => {
            images = [...images, { url: item.path + '.' + item.extension }]
        })
        if (images.length == 0) {
            images = result[0]?.thumbnail ?
                [{ url: result[0]?.thumbnail?.path + '.' + result[0]?.thumbnail?.extension }] : []
        }
        setImages(images)
        setLoading(false)
    }

    const renderIndicator = (currentIndex, allSize) => {
        return (
            <View style={styles.numContainer}>
                <Text style={styles.num}>
                    {currentIndex + ' / ' + allSize}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={closeModal}  >
                <Icon name='arrow-back' style={{ fontSize: 20 }} color='#fff' />
            </TouchableOpacity>
            {!loading && <>
                <View style={styles.header}>
                    <Text style={styles.txt} >{data[0]?.title}{data[0]?.description ? '\n\n' + data[0]?.description : ''}</Text>
                </View>
                {images.length == 0 ?
                    <Logo
                        width={wp(50)}
                        height={hp(50)}
                    />
                    :
                    <ImageViewer
                        style={styles.imagViewrContainer}
                        saveToLocalByLongPress={false}
                        useNativeDriver={true}
                        imageUrls={images}
                        enableSwipeDown
                        onSwipeDown={closeModal}
                        enablePreload
                        renderIndicator={renderIndicator}
                    />
                }
            </>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        zIndex: 1,
        left: wp(3),
        top: hp(2),
        width: wp(8), height: wp(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: COLORS.LIGHT + 50
    },
    txt: {
        //  fontFamily: FONTS.REGULAR,
        color: COLORS.WHITE,
        //fontWeight: 'bold',
        fontSize: hp('1.9'),
        padding: 10,
        width: wp(98),
        textAlign: 'left',
        backgroundColor: '#00000099',
        borderRadius: 10
    },

    header: {
        position: 'absolute',
        top: hp(8),
        zIndex: 2,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
        // height: hp(15),
    },

    imagViewrContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    numContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    num: {
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.LIGHT + 50,
        width: wp(15)
    }
});
