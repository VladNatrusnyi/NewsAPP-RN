import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AppText } from './ui/AppText'

export const News = ({ newsItem, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(newsItem.id)}
    >
      <View style={styles.news}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: newsItem.urlToImage,
        }}
      />
        
        <AppText>{newsItem.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  news: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 5,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 10
  },
  tinyLogo: {
    width: '100%',
    height: 150,
    marginBottom: 10
  },
})
