import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, FlatList} from 'react-native';
import {Colors } from 'react-native-paper'; // for the colors
import { current_theme } from './VeggieTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VeggieItemDetails(props) {
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [foodStored, setFoodStored] = useState(false); 
    const [foodVeganInfo, setFoodVeganInfo] = useState(null); 
    const [loadingData, setLoadingData] = useState(true);
    const [errFound, setErrFound] = useState(false);

    useEffect(() => {
        fetchFood();
    }, []);


    var createAndStoreFood = async () => {
        var is_vegan
        if (food["not vegan"].length !== 0) {
            is_vegan = "not";
        } else if (food["maybe vegan"].length !== 0) {
            is_vegan = "maybe";
        } else {
            is_vegan = "vegan";
        }
        var foodJson = {
            "name": food.name,
            "barcode": props.barcode,
            "vegan": is_vegan,
            "vegan_ingredients": food["vegan"],  ///TYPO IN API
            "non_vegan_ingredients": food["not vegan"],
            "maybe_vegan_ingredients": food["maybe vegan"]
            
        }
        
        try {
            const value = await AsyncStorage.getItem('@foods')
            if(value !== null) {
                var foods = JSON.parse(value);
                foods.foods.unshift(foodJson);
                if(foods.foods.length >  20) {
                    foods.foods.pop();
                }
                await AsyncStorage.setItem('@foods', JSON.stringify(foods));
            } else {
                var foods = {"foods": [foodJson]};
                await AsyncStorage.setItem('@foods', JSON.stringify(foods));
            }
        }
        catch(e) {
            
        }
        setFoodStored(true);
        setFoodVeganInfo(foodJson);
        setLoadingData(false);
    };

    const fetchFood = async () => {
        try {
            const response = await fetch(`https://vegan-api.herokuapp.com/vegan_ingredents/${props.barcode}`, 
            {headers: {'authorization': 'YOUR KEY HERE'}}) //insert key here
            const json = await response.json();
            setFood(json); // set the food state variable to the json response
            setLoading(false);
        } catch (error) {
            setErrFound(true);
        }
    };

    if(errFound) {
        return (
            <View style={[styles.container, {backgroundColor: current_theme.colors.background}]}>
                <Text style={[styles.noData, {color: current_theme.colors.text}]}>Error: Food not found!</Text>
            </View>
        );
    }

    if (!loading && foodStored === false) {
        createAndStoreFood();
    } 
    if (loadingData  || loading) {
        return (
            <View style={[styles.container, {backgroundColor: current_theme.colors.background}]}>
                <ActivityIndicator size="large" color="#00ff00" style={styles.loading}/>
            </View>
        );
    } else {
        var vegan_text_color = "green";
        var vegan_text = "Vegan";
        if (foodVeganInfo.vegan === "not") {
            vegan_text_color = Colors.red500;
            vegan_text = "Not Vegan";
        } else if (foodVeganInfo.vegan === "maybe") {
            vegan_text_color = "#FFBF00";
            vegan_text = "Maybe Vegan";
        } else {
            vegan_text_color = Colors.green500;
            vegan_text = "Vegan";
        }
        
        var combinedList = []
        for (var i = 0; i < foodVeganInfo.non_vegan_ingredients.length; i++) {
            combinedList.push(["not", foodVeganInfo.non_vegan_ingredients[i]]);
        }
        for (var i = 0; i < foodVeganInfo.maybe_vegan_ingredients.length; i++) {
            combinedList.push(["maybe", foodVeganInfo.maybe_vegan_ingredients[i]]);
        }
        for (var i = 0; i < foodVeganInfo.vegan_ingredients.length; i++) {
            combinedList.push(["vegan", foodVeganInfo.vegan_ingredients[i]]);
        }
        var my_list_view = (
            <FlatList
                data={combinedList} // the data to render
                renderItem={({item}) => ( // how to render each item
                    <View style={styles.listItem}>
                        <Ionicons name={item[0] === "vegan" ? "checkmark-circle" : item[0] === "maybe" ? "help-circle" : "close-circle"} size={12} color={item[0] === "vegan" ? Colors.green500 : item[0] === "maybe" ? "#FFBF00" : Colors.red500} />
                        <Text style={[styles.text, {color: current_theme.colors.text}]}>{item[1]}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()} // how to get the key for each item
            />
        );

        return (
            <View style={[styles.container, {backgroundColor: current_theme.colors.background}]}>
                    <Text style={[styles.title, {color: vegan_text_color}]}>{vegan_text}</Text>
                    <Text style={[styles.subtitle, {color: current_theme.colors.text}]}>{foodVeganInfo.name}</Text>
                    {my_list_view}
            </View>
            );
    }
}

const styles = StyleSheet.create({
    noData: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        
        padding: 5,
        paddingRight: "15%",
        paddingLeft: "15%",
    },
    container: {
      flex: 1,
    },
    title: {
      textTransform: 'capitalize',
      fontSize: 35,
      paddingTop: 20,
      paddingBottom: 10,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: "2%", 
    },
    subtitle: {
        textTransform: 'capitalize',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingBottom: "5%",
        alignSelf: 'center',
        marginTop: "2%",
    },
    text: {
      textTransform: 'capitalize',
      fontSize: 16,
      paddingLeft: '1%',
      paddingRight: '20%',
    },
    divider: {
      alignSelf: 'center',
      width: '95%',
    },
  });
