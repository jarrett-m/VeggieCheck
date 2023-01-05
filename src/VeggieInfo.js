import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking} from 'react-native';
import {Colors, Divider, Button} from 'react-native-paper'; // for the colors
import { current_theme } from './VeggieTheme';

export default function VeggieInfo() {
    return (
        <View style={styles.container} backgroundColor={current_theme.colors.background}>
            <ScrollView style={styles.scrollview}>
          <Text style={[styles.payment_text_header, {color: current_theme.colors.text}]}>Support Veggie Check!</Text>
          <Text style={[styles.sub_text, {color: current_theme.colors.text}]}>
            As you noticed, Veggie Check is completely free to use, with no ads or data collection. 
            It is purly a passion project to help people eat more plant based foods for the enviorment 
            and the animals. To contribute to the code base, or any other means of support, please visit 
          <Text> </Text>
          <Text style={[styles.sub_text, {color: Colors.blue400}]} onPress={() => Linking.openURL('https://www.veggiecheck.org')}>
             veggiecheck.org
          </Text>
          !
          </Text>
          <Button  style={styles.button} color={Colors.green400} mode="contained"  onPress={() => Linking.openURL('https://www.veggiecheck.org')}>
            Visit Us!
         </Button>
          <Divider style={styles.divider}/>        
          <Text style={[styles.payment_text_header, {color: current_theme.colors.text}]}>Import Information</Text>
          <Text style={[styles.sub_text, {color: current_theme.colors.text}]}>
          This app is not a replacement for a doctor or nutritionist. Please consult a doctor or nutritionist before making any dietary changes.
          </Text>
          <Text style={[styles.sub_text, {color: current_theme.colors.text}]}>
          This app was developed by a Vegan activist computer science student. The data is as accurate as I could make it, but it is not perfect so please double check ingredients. If you find any errors, please visit our website and submit a report.
          </Text>
          <Divider style={styles.divider}/>
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    button_view: {
        alignItems: 'center',
        marginBottom: '.5%',
        marginBottom: '5%',
    },
    container: {
        flex: 1,
    },
    button: {
        alignSelf: 'center',
        marginBottom: 20,
        width: 145,
        marginBottom: 20,
        borderRadius: 15,
        color: Colors.green200,
    },
    payment_text_header: {
      fontSize: 25,
      marginLeft: '10%',
      marginRight: '10%',
      paddingTop: 20,
      paddingBottom: 10,
      fontWeight: 'bold',

      },
      divider: {
        alignSelf: 'center',
        width: '95%',
      },
      sub_text: {
        fontSize: 16,
        marginLeft: '10%',
        marginRight: '10%',
        paddingBottom: 20,
      },
});
