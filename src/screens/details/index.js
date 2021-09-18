import React, { useState, useCallback, useEffect, PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { HeaderDetails } from '../../components'
import { COLORS, FONTS } from '../../utils'

const HEADER_HEIGHT = 250


export default Details = ({ route }) => {
    const TabNames = ['comics', 'series', 'stories', 'events', 'urls']
    const item = route.params.item
    const [tab, setTab] = useState({ "index": 0, "tabName": "comics" });

    const renderItem: PureComponent = ({ item, index }) => {
        return (
            <TouchableOpacity key={tab.tabName + index} style={styles.box} onPress={() => pressItem(item)} >
                <Text style={{ color: COLORS.WHITE }} >
                    {tab.tabName == 'urls' ? item.type : item.name}
                </Text>
            </TouchableOpacity>
        )
    }
    const pressItem = (item) => {
        if (tab.tabName == 'urls') Linking.openURL(item.url)
        else alert(`Call api to show details, Api end point is: ${item.resourceURI}`)
    }

    useEffect(() => {
        if (tab) console.log({ tab });
    }, [tab])

    return (
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
                            ListHeaderComponent={() => {
                                return (
                                    <Text style={{
                                        color: '#fff',
                                        padding: 15,
                                        //  fontFamily: FONTS.REGULAR,
                                        fontWeight: 'bold',
                                        fontSize: hp(2),
                                        borderBottomWidth: 2,
                                        borderBottomColor: COLORS.SECONDARY

                                    }}>
                                        {`Number of ${name} : `}
                                        <Text>
                                            {name == 'urls' ? item[name].length : item[name].returned}
                                        </Text>
                                    </Text>
                                )
                            }}
                            data={name == 'urls' ? item[name] : item[name].items}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item.id}
                        />
                    </Tabs.Tab>
                )
            })}

        </Tabs.Container >
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        backgroundColor: COLORS.LIGHT + 50,
        margin: 5

    },

})

