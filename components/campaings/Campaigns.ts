export type CampaignStatus = 'Open' | 'Completed' | 'Urgent' | 'Deleted';

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  date: string;
  location: string;
  donations: number;
};

export const campaigns: Campaign[] = [
  { id: '1', name: 'City General Hospital', status: 'Open', date: '2024-01-15', location: 'Downtown Medical Center', donations: 25 },
  { id: '2', name: 'Red Cross Emergency', status: 'Completed', date: '2024-01-18', location: 'Community Center Hall', donations: 15 },
  { id: '3', name: "Children's Hospital", status: 'Open', date: '2024-01-20', location: 'University Campus', donations: 30 },
  { id: '4', name: 'Emergency Medical Services', status: 'Urgent', date: '2024-01-22', location: 'Blood Bank Center', donations: 12 },
  { id: '5', name: 'Trauma Center Network', status: 'Urgent', date: '2024-01-25', location: 'Mobile Unit - Downtown', donations: 40 },
  { id: '6', name: 'Metropolitan Hospital', status: 'Open', date: '2024-01-28', location: 'Medical District', donations: 20 },
  { id: '7', name: 'St. Jude Outreach', status: 'Completed', date: '2024-02-02', location: 'Riverside Clinic', donations: 18 },
  { id: '8', name: 'Hopewell Medical', status: 'Open', date: '2024-02-05', location: 'Eastside Pavilion', donations: 22 },
  { id: '9', name: 'Unity Health Network', status: 'Deleted', date: '2024-02-08', location: 'Northside Blood Center', donations: 35 },
  { id: '10', name: 'Global Aid Foundation', status: 'Open', date: '2024-02-10', location: 'Mobile Unit - West Park', donations: 28 },
  { id: '11', name: 'Lakeside Regional', status: 'Completed', date: '2024-02-12', location: 'Lakeside Hospital', donations: 16 },
  { id: '12', name: 'Wellness First Clinic', status: 'Open', date: '2024-02-14', location: 'Suburban Health Center', donations: 10 },
  { id: '13', name: 'Guardian Health', status: 'Deleted', date: '2024-02-16', location: 'Guardian Pavilion', donations: 24 },
  { id: '14', name: 'NovaCare Outreach', status: 'Open', date: '2024-02-18', location: 'NovaCare Mobile Unit', donations: 19 },
  { id: '15', name: 'Central Blood Alliance', status: 'Completed', date: '2024-02-20', location: 'Alliance HQ', donations: 27 },
];
