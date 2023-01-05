import {Appbar, Provider as PaperProvider, DarkTheme, Card, Colors, Button} from 'react-native-paper';
import { StyleSheet, View, ScrollView} from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import VeggieAppbar from './VeggieAppbar.js';
import {current_theme, updateTheme} from './VeggieTheme.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class VeggieSettings extends React.Component {
    
    UpdateThemeCard = () => {
        return (
            <Card style={styles.card}>
                <Card.Title title="Theme" subtitle="Change the theme of the app" />
                <Card.Actions>
                    <Button color={Colors.green500} mode="outlined" onPress={() => {this.changeTheme(this.props.page)}} style={styles.settingsButton}> Change theme </Button>
                </Card.Actions>
            </Card>
        );
    } 

    ClearDataCard = () => {
        return (
            <Card style={styles.card}>
                <Card.Title title="Clear History" subtitle="Clear scan history from the app" />
                <Card.Actions>
                    <Button color={Colors.green500} mode="outlined" onPress={() => {this.clearData()}} style={styles.settingsButton}> Clear data </Button>
                </Card.Actions>
            </Card>
        );
    }

    SetDataCard = () => {
        return (
            <Card style={styles.card}>
                <Card.Title title="Set History" subtitle="Set some scan history of pre-defined data" />
                <Card.Actions>
                    <Button color={Colors.green500} mode="outlined" onPress={() => {this.setData()}} style={styles.settingsButton}> Set data </Button>
                </Card.Actions>
            </Card>
        );
    }

    clearData = async () => {
        //Clears foods stored in data.json
        var foods = {
            "foods": [
            ]
        }
        AsyncStorage.setItem('@foods', JSON.stringify(foods)); 
    }

    setData = async () => {
        var foods = {
            "foods": [
                {
                    "name": "Amys Vegan Pizza Margherita",
                    "barcode": "042272008018",
                    "vegan": "vegan",
                    "vegan_ingredients": [
                        "organic carrot","yeast.","organic pumpkin and organic apple","organic diced tomatoes","expeller pressed high oleic safflower and/or sunflower oil","organic potato starch","organic tomato pure","extra virgin olive oil","organic coconut oil","organic basil","filtered water","natural flavoring","organic unbleached wheat flour","organic ground sunflower kernels","organic agave syrup","black pepper","sea salt"
                    ],
                    "non_vegan_ingredients": [
                    ],
                    "maybe_vegan_ingredients": [
                    ]
                },
                {
                    "name": "Milk Duds",
                    "barcode": "81087993",
                    "vegan": "not",
                    "vegan_ingredients": [
                        "corn syrup","baking soda","palm oil","and/or safflower oil","chocolate","lecithin (soy)","artificial flavor.","palm kernel oil","sunflower oil","salt","sugar","vanillin","shea oil","contains 2% or less of: brown sugar","dextrose","tapioca dextrin"
                    ],
                    "non_vegan_ingredients": [
                        "skim milk","whey (milk)","confectioner's glaze","mono- and diglycerides","reduced protein whey (milk)"
                    ],
                    "maybe_vegan_ingredients": [
                    ]
                },
                {
                    "name": "Ben and Jerry's Vegan Chocolate Fudge Brownie",
                    "barcode": "076840580743",
                    "vegan": "vegan",
                    "vegan_ingredients": [
                        "coconut oil","salt","pea protein","sunflower lecithin","almonds","water","guar gum","natural flavor (coconut)","wheat flour","soy lecithin","corn starch","vanilla extract","sugar","baking soda","barley malt.","soybean oil","cocoa powder","cocoa (processed with alkali)","locust bean gum","corn syrup solids","corn syrup"
                    ],
                    "non_vegan_ingredients": [
                    ],
                    "maybe_vegan_ingredients": [
                    ]
                },
                {
                    "name": "Coca-Cola Zero Sugar",
                    "barcode": "050000100001",
                    "vegan": "maybe",
                    "vegan_ingredients": [
                        "caramel color","potassium citrate","potassium benzoate (to protect taste)","phosphoric acid","carbonated water","caffeine.","acesulfame potassium","aspartame"
                    ],
                    "non_vegan_ingredients": [
                    ],
                    "maybe_vegan_ingredients": [
                        "natrual flavors"
                    ]
                }
            ]
        }
        foods = JSON.stringify(foods)
        try {
            await AsyncStorage.setItem('@foods', foods)
        } catch(e) {
            // save error
        } 
    }

    render() {
      return(
        <PaperProvider theme={current_theme}>
        <StatusBar style = {current_theme === DarkTheme ? "light" : "dark"}/>
        <View style={styles.container} backgroundColor={current_theme.colors.background}>
        <ScrollView>
          <this.UpdateThemeCard page={this.props.page}/>
          <this.ClearDataCard/>
          <this.SetDataCard/>
        </ScrollView>
        </View>
        </PaperProvider>
      ); 
    }

    changeTheme = async () => {
        var old_theme = await AsyncStorage.getItem('@theme');
        if (old_theme === 'light') {
            await AsyncStorage.setItem('@theme', 'dark');
        } else if (old_theme === 'dark') {
            await AsyncStorage.setItem('@theme', 'light');
        } else {
            if (current_theme === DarkTheme) {
                await AsyncStorage.setItem('@theme', 'light');
            } else {
                await AsyncStorage.setItem('@theme', 'dark');
            }
        }
        
        await updateTheme();
        this.forceUpdate();
        this.props.page.forceUpdate()
        
    } 
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
settingsButton: {
    borderRadius: 20,
},
card: {
    margin: 5,
    borderRadius: 20,
    paddingTop: 10,
},

});