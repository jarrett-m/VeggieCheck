import {Card, Colors, Divider} from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import * as React from 'react';
import { current_theme } from './VeggieTheme.js'; 
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryPage(props){
  cardsData = [];

  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [subtext, setSubtext] = useState(<Text>Loading...</Text>); 
  const [cards, setCards] = useState([]); 

  useEffect(() => { 
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@foods')
        if(value !== null) {
          setFoods(JSON.parse(value).foods);
        }
      } catch(e) {
        const x = []; // do nothing
        setFoods(x);
      }
    }
    getData().then(() => {setIsLoading(false)}); 
  }, [foods]); 

  useEffect(() => {
    cardsData = foods.map(
      (historyCard, index) => {
        var vegan_text = historyCard.vegan == "vegan" ? "Vegan" : (historyCard.vegan == "not" ? "Not Vegan" : "Maybe Vegan");
        return (
          <Card style={styles.card} key={index} onPress={() => props.page.setHistoryDetailsPage(historyCard.barcode)}>
          <Card.Content>
            <Text numberOfLines={1} style={[styles.card_title, {color: current_theme.colors.text}]}>{historyCard.name}</Text>
            <Text style={(historyCard.vegan === "vegan") ? styles.vegan_text : (historyCard.vegan === "maybe") ? styles.maybe_text : styles.not_text}> {vegan_text} </Text>
            <Text numberOfLines={1} style={[styles.upc_text, {color: current_theme.colors.text}]} >Barcode #{historyCard.barcode}</Text>
          </Card.Content>
        </Card>
        );
      }
    )
    var subtext
    if(cardsData.length === 0) { 
      subtext = <Text style={[styles.welcome_text, {color: current_theme.colors.text}]}>Whever you scan an item, it will be stored into your history here! So you can look back if you forget.</Text>
    } else {
      subtext = <Text style={[styles.welcome_text, {color: current_theme.colors.text}]}>Here are some of the items you have recently scanned.</Text>
    }
    setSubtext(subtext); 
    setCards(cardsData);
  }, [foods]);

  if (isLoading) {
    return (<View style={styles.container} backgroundColor={current_theme.colors.background}>
        <ScrollView>
          <Text style={[styles.welcome_text_header, {color: current_theme.colors.text}]}>Welcome to Veggie Check,</Text>
        </ScrollView>
        </View>);
  } else {
    return (
        <View style={styles.container} backgroundColor={current_theme.colors.background}>
        <ScrollView>
          <Text style={[styles.welcome_text_header, {color: current_theme.colors.text}]}>Welcome to Veggie Check,</Text>
          {subtext}
          <Divider style={styles.divider}/>
          {cards}
        </ScrollView>
        </View>
      ); // end return
  } 

} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    borderRadius : 20, 
  },
  appbar_text: {
    paddingLeft: 20, 
  },
  bottombar: {
    borderRadius : 20,
    height: 70,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    marginTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
  },
  icons: {
    fontSize: 30,
  },
  card: {
    marginTop: 20,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '.5%',
    borderRadius: 20,
    flex: 1,
  },
  card_title: {
    textTransform: 'capitalize',
    fontSize: 20,
    paddingBottom: 3,
    paddingLeft: 4,
  },
  vegan_text: {
    textTransform: 'capitalize',
    color: Colors.green500, 
    fontSize: 16,
  },
  not_text: {
    textTransform: 'capitalize',
    color: Colors.red500,
    fontSize: 16,
  },
  maybe_text: {
    textTransform: 'capitalize',
    color: "#FFBF00",
    fontSize: 16,
  },
  upc_text: {
    paddingLeft: 5, 
    paddingTop: 5, 
  },
  subtitle: {
    backgroundColor: current_theme.colors.background,
    height: 50,
  },
  welcome_text_header: {
    fontSize: 25,
    marginLeft: '10%',
    marginRight: '10%',
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  welcome_text: {
    fontSize: 16,
    marginLeft: '10%',
    marginRight: '10%',
    paddingBottom: 20,
  },
  divider: {
    alignSelf: 'center',
    width: '95%',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: current_theme.colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
