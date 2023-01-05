import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform} from 'react-native';
import VeggieAppbar from './VeggieAppbar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { current_theme } from './VeggieTheme';


export default function VeggieScan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data.length > 12) {
      data = data.substring(data.length - 12, data.length);
    }
    props.page.setItemDetailsPage(data);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <View style={styles.nopermsview}>
                <Text></Text>
                <Text style={styles.text}>Requesting camera permissions...</Text>
            </View>;
  }
  if (hasPermission === false) {
    return <View style={styles.nopermsview}>
                <Text style={styles.text}>No access to camera, you might need to update camera premessions for this app!</Text>
            </View>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanner} />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        flex: 1,
    },
    text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 0,
        color: current_theme.colors.text,
        paddingTop: "30%"
    },
    scanner: {
        position: 'absolute', 
        left: 0,
        right: 0,
        top: 0,
        zIndex: -1, // make sure the scanner is behind the appbar and header
        bottom: 0,
    },
    nopermsview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: current_theme.colors.background, // make sure the background is the same as the appbar
      },
});
