import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

interface Broker {
  broker: string;
  login_url: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function BrokerSelection({ isVisible, onClose }: Props) {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBrokers = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log("Token for borker: ",token)
        const response = await api.get<Broker[]>('/broker', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setBrokers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch brokers', error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchBrokers();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Broker</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={brokers}
              keyExtractor={(item, index) => item.broker + index}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.brokerItem}>
                  <Text style={styles.brokerInitial}>{item.broker[0]}</Text>
                  <Text style={styles.brokerText}>{item.broker}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    backgroundColor: '#1f1f2f',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
  },
  brokerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  brokerInitial: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8e44ad',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 30,
  },
  brokerText: {
    color: '#fff',
    fontSize: 16,
  },
});
