// CampaignCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Campaign, CampaignStatus } from './Campaigns';

const statusColors: Record<CampaignStatus, string> = {
  Open: '#16a34a',
  Completed: '#6b7280',
  Urgent: '#dc2626',
  Deleted: '#9ca3af',
};

type Props = {
  campaign: Campaign;
  onPressDonate?: () => void;
};

export const CampaignCard: React.FC<Props> = ({ campaign, onPressDonate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {campaign.name}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[campaign.status] + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColors[campaign.status] }]} />
          <Text style={[styles.statusText, { color: statusColors[campaign.status] }]}>
            {campaign.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{campaign.date}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value} numberOfLines={2}>
          {campaign.location}
        </Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.donations}>{campaign.donations} donations</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressDonate}
          disabled={campaign.status === 'Deleted'}
        >
          <Text style={styles.buttonText}>I Want to Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  infoBlock: {
    marginTop: 8,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
  },
  value: {
    fontSize: 12,
    color: '#111827',
  },
  footerRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donations: {
    fontSize: 12,
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
});