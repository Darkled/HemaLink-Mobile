import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
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
import { WebView } from 'react-native-webview';

const getBaiduMapUrl = (lng: number, lat: number, name: string, location: string) =>
  `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodeURIComponent(name)}&content=${encodeURIComponent(location)}&output=html`;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const DonationsScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});

  const filtered = useMemo(
    () =>
      campaigns.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  const theme = darkMode ? darkTheme : lightTheme;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setErrors({});
  };

  const openModal = (campaign) => {
    resetForm();
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setModalVisible(false);
      setSuccessModalVisible(true);
      resetForm();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>

      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Image
            source={require('../assets/hemalink_isotype.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.brandText, { color: theme.text }]}>HemaLink</Text>
        </View>
        <View style={styles.darkModeRow}>
          <Text style={{ color: theme.text, marginRight: 6 }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

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

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CampaignCard
            campaign={item}
            theme={theme}
            onPressDonate={() => openModal(item)}
          />
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>

            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Donate — {selectedCampaign?.name}
            </Text>

            <Text style={[styles.modalLocation, { color: theme.placeholder }]}>
              {selectedCampaign?.location}
            </Text>

            <View style={[styles.mapContainer, { backgroundColor: theme.bg }]}>
              <WebView
                source={{ uri: getBaiduMapUrl(116.404, 39.915, selectedCampaign?.name ?? '', selectedCampaign?.location ?? '') }}
                style={{ flex: 1 }}
              />
            </View>

            <Text style={[styles.label, { color: theme.text }]}>Full name <Text style={styles.required}>*</Text></Text>
            <TextInput
              placeholder="Your full name"
              placeholderTextColor={theme.placeholder}
              value={fullName}
              onChangeText={(t) => { setFullName(t); setErrors(e => ({ ...e, fullName: undefined })); }}
              style={[styles.input, { borderColor: errors.fullName ? '#ef4444' : theme.border, color: theme.text, backgroundColor: theme.bg }]}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <Text style={[styles.label, { color: theme.text }]}>Email <Text style={styles.required}>*</Text></Text>
            <TextInput
              placeholder="name@example.com"
              placeholderTextColor={theme.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => { setEmail(t); setErrors(e => ({ ...e, email: undefined })); }}
              style={[styles.input, { borderColor: errors.email ? '#ef4444' : theme.border, color: theme.text, backgroundColor: theme.bg }]}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={[styles.label, { color: theme.text }]}>Phone number <Text style={styles.required}>*</Text></Text>
            <TextInput
              placeholder="+1 (555) 000-0000"
              placeholderTextColor={theme.placeholder}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(t) => { setPhone(t); setErrors(e => ({ ...e, phone: undefined })); }}
              style={[styles.input, { borderColor: errors.phone ? '#ef4444' : theme.border, color: theme.text, backgroundColor: theme.bg }]}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: theme.border }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <Modal visible={successModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, alignItems: 'center' }]}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>✅</Text>
            <Text style={[styles.modalTitle, { color: theme.text, textAlign: 'center' }]}>
              Sign-up successful!
            </Text>
            <Text style={{ color: theme.placeholder, textAlign: 'center', marginTop: 4, marginBottom: 20 }}>
              You have been registered for {selectedCampaign?.name}. We will contact you soon.
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.submitText}>OK</Text>
            </TouchableOpacity>
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
  card: '#1e293b',
  border: '#334155',
  placeholder: '#94a3b8',
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  brandText: {
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
  mapContainer: {
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
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
  required: {
    color: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});
