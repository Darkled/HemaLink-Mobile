// DonationsScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { campaigns } from '../components/campaings/Campaigns';
import { CampaignCard } from '../components/campaings/CampaignsCard';


const DonationsScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filtered = useMemo(
    () =>
      campaigns.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>Donations</Text>
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
            onPressDonate={() => {
              // acá podrías navegar o abrir modal
              console.log('Donate to', item.name);
            }}
          />
        )}
      />
    </SafeAreaView>
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
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});