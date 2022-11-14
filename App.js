import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, Button } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { NewsScreen } from './src/screens/NewsScreen'
import { THEME } from './src/theme'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [newsItemId, setNewsItemId] = useState(null)
  const [news, setNews] = useState([
  
  ])

  const loadNews = () => {
    fetch('https://newsapi.org/v2/everything?q=apple&from=2022-11-12&to=2022-11-12&sortBy=popularity&apiKey=f76652671f5d4572abea6aa18d4a7dac&pageSize=20')
    .then(response => response.json())
    .then(json => {
      setNews(json.articles.map((item,index) => ({...item, id: index + 1})))
      console.log(json)
    })
  }


  if (!isReady) {
    return (

      <AppLoading 
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    
    )
  }


  let content = (
    <MainScreen
      news={news}
      openNews={setNewsItemId}
      loadNews={loadNews}
    />
  )

  if (newsItemId) {
    const selectedNewsItem = news.find(newsItem => newsItem.id === newsItemId)
    content = (
      <NewsScreen
        goBack={() => setNewsItemId(null)}
        newsItem={selectedNewsItem}
      />
    )
  }

  return (
    <View>
      <Navbar title='News App!' />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
})
