import * as React from 'react';
import HistoryPage from './History.js';
import VeggieSettings from './VeggieSettings.js';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import {View, Text} from 'react-native';
import { current_theme, setCurrentTheme } from './VeggieTheme.js';
import { StatusBar } from 'expo-status-bar';
import VeggieBottombar from './VeggieBottombar.js';
import VeggieScan from './VeggieScan.js';
import VeggieAppbar from './VeggieAppbar.js';
import VeggieItemDetails from './VeggieItemDetails.js';
import VeggieInfo from './VeggieInfo.js';
import VeggieHistoryDetails from './VeggieHistoryDetails.js';

export default class App extends React.Component {
  currentPage = <HistoryPage page={this}/>;
  pageName = "Home";

  
  state = {
    isLoading: true
  };

  componentDidMount() {
    setCurrentTheme().then(() => {
      this.setState({isLoading: false});
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View><Text></Text></View>;;
    } else {
    return(
      <PaperProvider theme={current_theme}>
        <StatusBar style = {current_theme === DarkTheme ? "light" : "dark"}/>
        <VeggieAppbar name={this.pageName} />
        {this.currentPage}
        <View backgroundColor= {current_theme.colors.background}>
          <VeggieBottombar page={this}/>
        </View>
      </PaperProvider>
    ); 
    }
  } 

  setHistoryPage = () => {
    this.currentPage = <HistoryPage page={this}/>;
    this.pageName = "Home";
    this.forceUpdate();
  }
  setHistoryDetailsPage = (barcode) => {
    this.currentPage = <VeggieHistoryDetails barcode={barcode}/>;
    this.pageName = "Item Details";
    this.forceUpdate();
  }

  setSettingsPage = () => {
    this.currentPage = <VeggieSettings page={this}/>;
    this.pageName = "Settings";
    this.forceUpdate();
  } 

  setDonatePage = () => {
    this.currentPage = <VeggieInfo/>;
    this.pageName = "Donate";
    this.forceUpdate();
  }

  setScanPage = () => {
    this.currentPage = <VeggieScan page={this}/>;
    this.pageName = "Scanner";
    this.forceUpdate();
  }

  setItemDetailsPage = (barcode) => {
    this.currentPage = <VeggieItemDetails barcode={barcode}/>;
    this.pageName = "Item Details";
    this.forceUpdate();
  }
  
}