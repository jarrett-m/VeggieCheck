import {Appbar,} from 'react-native-paper';
import { StyleSheet} from 'react-native';
import * as React from 'react';

export default class VeggieBottombar extends React.Component {
    render () {
        return (
      <Appbar style={[styles.bottombar]}>
          <Appbar.Action size={32} icon="information-outline" onPress={() => {this.props.page.setDonatePage()}} />
          <Appbar.Action size={32} icon="home-outline" onPress={() => {this.props.page.setHistoryPage()}} />
          <Appbar.Action size={32} icon="crop-free" onPress={() => {this.props.page.setScanPage()}}/>
          <Appbar.Action size={32} icon="cog-outline" onPress={() => {this.props.page.setSettingsPage()}} />
      </Appbar>
        );
    }
  };

const styles = StyleSheet.create({
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
});
