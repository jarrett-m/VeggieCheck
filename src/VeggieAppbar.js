import {Appbar} from 'react-native-paper';
import * as React from 'react';
import { StyleSheet} from 'react-native';


export default class VeggieAppbar extends React.Component {
    render() {
        return (
            <Appbar.Header style={styles.appbar}>
            <Appbar.Content title={this.props.name}/>
            </Appbar.Header>
        );
    }
}

const styles = StyleSheet.create({
    appbar :{
        elevation: 1,
}   
});