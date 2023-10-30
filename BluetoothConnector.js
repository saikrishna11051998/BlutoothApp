// BluetoothConnector.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BluetoothConnector = () => {
  const [device, setDevice] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const bleManager = new BleManager();
    setManager(bleManager);

    // Cleanup on unmount
    return () => {
      if (bleManager) {
        bleManager.destroy();
      }
    };
  }, []);

  const startScan = () => {
    if (manager) {
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.error(error);
          return;
        }
        // You can filter devices based on your requirements
        console.log('Scanned device:', scannedDevice);
      });
    }
  };

  const connectToDevice = () => {
    if (device && manager) {
      manager.stopDeviceScan();
      device.connect()
        .then((device) => {
          console.log('Connected to device:', device);
          // Now you can perform Bluetooth operations with the connected device
        })
        .catch((error) => {
          console.error('Connection error:', error);
        });
    }
  };

  return (
    <View>
      <Text>Bluetooth Connector</Text>
      <Button title="Start Scan" onPress={startScan} />
      <Button title="Connect to Device" onPress={connectToDevice} />
    </View>
  );
};

export default BluetoothConnector;
