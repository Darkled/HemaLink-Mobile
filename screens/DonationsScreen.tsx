// DonationsScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Switch,
  Modal,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

import { campaigns } from '../components/campaings/Campaigns';
import { CampaignCard } from '../components/campaings/CampaignsCard';

const DonationsScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Modal
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = useMemo(
    () =>
      campaigns.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  const theme = darkMode ? darkTheme : lightTheme;

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>Donations</Text>
        <View style={styles.darkModeRow}>
          <Text style={{ color: theme.text, marginRight: 6 }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Find campaigns..."
        placeholderTextColor={theme.placeholder}
        value={query}
        onChangeText={setQuery}
        style={[
          styles.search,
          { backgroundColor: theme.card, color: theme.text, borderColor: theme.border },
        ]}
      />

      {/* LISTA */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CampaignCard
            campaign={item}
            onPressDonate={() => openModal(item)}
          />
        )}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              Donate — {selectedCampaign?.name}
            </Text>

            <Text style={styles.modalLocation}>
              {selectedCampaign?.location}
            </Text>

            <View style={styles.mapPlaceholder}>
              <Text style={{ color: '#6b7280' }}>
                Google Maps placeholder for: {selectedCampaign?.location}
              </Text>
            </View>

            <Text style={styles.label}>Full name</Text>
            <TextInput placeholder="Your full name" style={styles.input} />

            <Text style={styles.label}>Email</Text>
            <TextInput placeholder="name@example.com" style={styles.input} />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default DonationsScreen;

const lightTheme = {
  bg: '#f3f4f6',
  text: '#111827',
  card: '#ffffff',
  border: '#e5e7eb',
  placeholder: '#9ca3af',
};

const darkTheme = {
  bg: '#020617',
  text: '#e5e7eb',
  card: '#020617',
  border: '#1f2937',
  placeholder: '#6b7280',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  cancelText: {
    color: '#374151',
    fontWeight: '600',
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
});