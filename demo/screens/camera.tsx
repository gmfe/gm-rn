import React from 'react';
import { Screen } from '../../packages/components/src';
import { QRScannerView } from 'react-native-qrcode-scanner-view';
import { Text } from 'react-native';

const Component = () => {
  const renderTitleBar = () => (
    <Text style={{ color: 'white', textAlign: 'center', padding: 16 }}>
      Title
    </Text>
  );

  const renderMenu = () => (
    <Text style={{ color: 'white', textAlign: 'center', padding: 16 }}>
      Menu
    </Text>
  );

  const barcodeReceived = (event) => {
    console.log('Type: ' + event.type + '\nData: ' + event.data);
  };

  return (
    <Screen>
      <QRScannerView
        onScanResult={barcodeReceived}
        renderHeaderView={renderTitleBar}
        renderFooterView={renderMenu}
        scanBarAnimateReverse={true}
      />
    </Screen>
  );
};

export default Component;
