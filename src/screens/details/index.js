import React, { useState, useEffect, useCallback } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Linking,
    Modal
} from 'react-native'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { HeaderDetails } from '../../components'
import { COLORS } from '../../utils'
import { ImageViewerModal } from './ImageViewerModal'

const TabNames = ['comics', 'series', 'stories', 'events', 'urls']
const Details = ({ route }) => {
    const item = route.params.item
    const [tab, setTab] = useState({ "index": 0, "tabName": "comics" });
    const [modalVisable, setModalVisable] = useState(false);
    const [url, setUrl] = useState('');


    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity
                key={tab.tabName == 'urls' ? item.type : item.name}
                style={styles.box}
                onPress={() => pressItem(item)} >
                <Text style={{ color: COLORS.WHITE }}> {tab.tabName == 'urls' ? item.type : item.name} </Text>
            </TouchableOpacity>
        )
    }, [tab.tabName == 'urls']);

    useEffect(() => {
        if (url) setModalVisable(true)
    }, [url])

    const pressItem = (item) => {
        if (tab.tabName == 'urls') Linking.openURL(item.url)
        else setUrl(item.resourceURI);

    }
    const closeModal = () => {
        setModalVisable(false)
    }

    useEffect(() => { console.log({ tab }) }, [tab])
    const keyExtractor = useCallback((item, index) => index.toString(), [])
    return (
        <>
            <Tabs.Container
                onTabChange={setTab}
                renderHeader={() => <HeaderDetails item={item} />}
                // lazy
                TabBarComponent={(props) =>
                    <MaterialTabBar
                        style={{ backgroundColor: '#000' }}
                        activeColor={'#fff'}
                        indicatorStyle={{ backgroundColor: COLORS.SECONDARY }}
                        inactiveColor={COLORS.LIGHT}
                        {...props} scrollEnabled />}
            >

                {TabNames.map((name) => {
                    return (
                        <Tabs.Tab name={name} key={name}>
                            <Tabs.FlatList
                                showsVerticalScrollIndicator={false}
                                style={{ backgroundColor: '#000' }}
                                initialNumToRender={10}
                                maxToRenderPerBatch={10}
                                ListHeaderComponent={() => {
                                    return (
                                        <Text key={name + 'text'} style={styles.Title}> {`Number of ${name} : `}
                                            <Text> {name == 'urls' ? item[name].length : item[name].returned} </Text>
                                        </Text>
                                    )
                                }}
                                data={name == 'urls' ? item[name] : item[name].items}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                            />
                        </Tabs.Tab>
                    )
                })}


            </Tabs.Container >
            <Modal
                visible={modalVisable}
                transparent={true}
                animationType='slide'
                onDismiss={closeModal}
                onRequestClose={closeModal}
            >
                <ImageViewerModal url={url} closeModal={closeModal} />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        backgroundColor: COLORS.LIGHT + 50,
        margin: 5
    },
    Title: {
        color: '#fff',
        padding: 15,
        fontWeight: 'bold',
        fontSize: hp(2),
        borderBottomWidth: 2,
        borderBottomColor: COLORS.SECONDARY
    }
})
export default Details
