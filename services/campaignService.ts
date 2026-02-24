import type { Campaign } from '../components/campaings/Campaigns';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type ApiResponse<T> = {
  Success: boolean;
  Data: T;
  Message: string;
};

export async function fetchCampaigns(): Promise<Campaign[]> {
  console.log('[campaignService] Fetching from:', `${API_URL}/api/Donor/blood-requests`);
  const response = await fetch(`${API_URL}/api/Donor/blood-requests`);

  if (!response.ok) {
    throw new Error(`Failed to fetch campaigns: ${response.status}`);
  }

  const json = await response.json();
  console.log('[campaignService] Raw response:', JSON.stringify(json, null, 2));
  const success = json.Success ?? json.success;
  const data = json.Data ?? json.data;
  const message = json.Message ?? json.message;

  if (!success) {
    throw new Error(message || 'Failed to fetch campaigns');
  }

  return data;
}

export type DonationSignUp = {
  bloodRequestId: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
};

export async function signUpForDonation(data: DonationSignUp): Promise<void> {
  const response = await fetch(`${API_URL}/api/Donor/blood-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Sign-up failed: ${response.status}`);
  }
}
