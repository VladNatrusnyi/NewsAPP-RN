import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, Button } from 'react-native'
import { News } from '../components/News'
import { THEME } from '../theme'

export const MainScreen = ({ news, openNews, loadNews }) => {
  let content = (
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={news}
        renderItem={({ item }) => (
          <News newsItem={item}  onOpen={openNews} />
        )}
      />
    </View>
  )

  if (news.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
        <Button style={{marginTop: 20}} title="Load news" onPress={loadNews}/>
      </View>
    )
  }

  return (
    <View>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
