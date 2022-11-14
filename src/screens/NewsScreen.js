import React, { useState, useCallback, useMemo } from 'react'
import { StyleSheet, View, Button, Dimensions, Text, Image, Linking } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
import dateFormat, { masks } from "dateformat";

export const NewsScreen = ({ goBack, newsItem }) => {
  const [modal, setModal] = useState(false)
  const [url, setURL] = useState(null)

  const saveHandler = title => {
    onSave(newsItem.id, title)
    setModal(false)
  }

  const memoizedValue = useMemo(() => newsItem.url, [newsItem]);


  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(memoizedValue);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(memoizedValue);
    } else {
      Alert.alert(`Don't know how to open this URL: ${memoizedValue}`);
    }
  }, [memoizedValue]);

  return (
    <View>
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{newsItem.title}</AppTextBold>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: newsItem.urlToImage,
        }}
      />
        <Text>{newsItem.description}</Text>

        <Button style={styles.btn} title='Read full news' onPress={() => handlePress(newsItem.url)}/>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goBack} color={THEME.GREY_COLOR}>
            <AntDesign name='back' size={20} color='#fff'>Back</AntDesign>
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    flexDirection: 'column',
    marginBottom: 20,
    padding: 15
  },
  button: {
    width: 200,
    // width: Dimensions.get('window').width / 3
    // width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  },
  tinyLogo: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    marginTop: 20
  },
  btn: {
    marginTop: 20
  }
})
