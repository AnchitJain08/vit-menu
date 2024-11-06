import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  restaurant: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#EEE',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 12,
  },
  itemName: {
    flex: 1,
  },
  quantity: {
    width: 30,
    textAlign: 'center',
  },
  price: {
    width: 80,
    textAlign: 'right',
  },
  total: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: 1,
    borderTopColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
  },
});

const OrderPDF = ({ cart, total }) => {
  // Group items by restaurant
  const itemsByRestaurant = cart.reduce((acc, item) => {
    if (!acc[item.restaurant]) {
      acc[item.restaurant] = [];
    }
    acc[item.restaurant].push(item);
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.subHeader}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>

        {Object.entries(itemsByRestaurant).map(([restaurant, items]) => (
          <View key={restaurant} style={styles.section}>
            <Text style={styles.restaurant}>{restaurant}</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.quantity}>x{item.quantity}</Text>
                <Text style={styles.price}>
                  ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.total}>
          <Text>Total Amount</Text>
          <Text>₹{total.toFixed(2)}</Text>
        </View>

        <Text style={styles.footer}>
          Thank you for your order! - VIT Bhopal Food Menu
        </Text>
      </Page>
    </Document>
  );
};

export default OrderPDF; 