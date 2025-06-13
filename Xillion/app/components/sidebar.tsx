import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const chats = [
    {
      title: "Market Analysis",
      preview: "What are the current market trends?",
      timestamp: "Today, 10:30 AM",
      unread: true,
    },
    {
      title: "Portfolio Optimization",
      preview: "How can I optimize my portfolio for better returns?",
      timestamp: "Yesterday, 2:15 PM",
    },
    {
      title: "Crypto Analysis",
      preview: "Tell me about HFTs and Crypto companies",
      timestamp: "Oct 15, 2023",
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.sidebarContainer} onStartShouldSetResponder={() => true}>
          <LinearGradient
            colors={['#201731', '#2D1F4A']}
            style={styles.sidebarContent}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Chat History</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                placeholder="Search conversations..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.newConversationButton}>
              <LinearGradient
                colors={['#9333EA', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.newConversationGradient}
              >
                <Ionicons name="add" size={20} color="white" style={styles.newConversationIcon} />
                <Text style={styles.newConversationText}>New Conversation</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.separator} />

            <ScrollView style={styles.chatList}>
              {chats.map((chat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.chatItem}
                >
                  <View style={styles.chatItemContent}>
                    <View style={styles.chatItemHeader}>
                      <Text style={[styles.chatItemTitle, chat.unread && styles.chatItemTitleUnread]}>
                        {chat.title}
                      </Text>
                      {chat.unread && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>New</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.chatItemPreview}>{chat.preview}</Text>
                  </View>
                  <Text style={styles.chatItemTimestamp}>{chat.timestamp}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebarContainer: {
    width: '75%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  sidebarContent: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D1F4A',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
  newConversationButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  newConversationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  newConversationIcon: {
    marginRight: 10,
  },
  newConversationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 15,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#2D1F4A',
  },
  chatItemContent: {
    flex: 1,
    marginRight: 10,
  },
  chatItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatItemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E0E0E0',
  },
  chatItemTitleUnread: {
    color: 'white',
    fontWeight: 'bold',
  },
  unreadBadge: {
    backgroundColor: '#9333EA',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chatItemPreview: {
    fontSize: 13,
    color: '#A0A0A0',
  },
  chatItemTimestamp: {
    fontSize: 11,
    color: '#A0A0A0',
    marginTop: 2,
  },
});
