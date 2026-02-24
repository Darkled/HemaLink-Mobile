import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bloodTypeLabels } from './Campaigns';
import type { Campaign, CampaignStatus } from './Campaigns';

export type CardTheme = {
  bg: string;
  text: string;
  card: string;
  border: string;
  placeholder: string;
};

const statusColors: Record<CampaignStatus, string> = {
  Open: '#16a34a',
  Completed: '#6b7280',
  Urgent: '#dc2626',
  Deleted: '#9ca3af',
};

type Props = {
  campaign: Campaign;
  onPressDonate?: () => void;
  theme?: CardTheme;
};

const defaultTheme: CardTheme = {
  bg: '#f3f4f6',
  text: '#111827',
  card: '#ffffff',
  border: '#e5e7eb',
  placeholder: '#9ca3af',
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const CampaignCard: React.FC<Props> = ({ campaign, onPressDonate, theme = defaultTheme }) => {
  const status = campaign.requestStatus as CampaignStatus;

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {campaign.requesterName}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[status] + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColors[status] }]} />
          <Text style={[styles.statusText, { color: statusColors[status] }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={[styles.label, { color: theme.placeholder }]}>Date</Text>
        <Text style={[styles.value, { color: theme.text }]}>{formatDate(campaign.requestDate)}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={[styles.label, { color: theme.placeholder }]}>Address</Text>
        <Text style={[styles.value, { color: theme.text }]} numberOfLines={2}>
          {campaign.address}
        </Text>
      </View>

      {campaign.bloodTypesNeeded && campaign.bloodTypesNeeded.length > 0 && (
        <View style={styles.infoBlock}>
          <Text style={[styles.label, { color: theme.placeholder }]}>Blood Types Needed</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {campaign.bloodTypesNeeded.map(bt => bloodTypeLabels[bt] ?? bt).join(', ')}
          </Text>
        </View>
      )}

      <View style={styles.footerRow}>
        <Text style={[styles.donations, { color: theme.placeholder }]}>
          {campaign.remainingUnits}/{campaign.targetUnits} units remaining
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressDonate}
          disabled={status === 'Deleted'}
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
