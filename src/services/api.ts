// API service for communicating with the backend
const API_BASE_URL = 'https://www.myapp.com/api/v1/calling';

export interface NumberMapping {
  id: number;
  phone_number: string;
  audio_url: string;
  text_content: string;
  created_at: string;
}

export interface CallLog {
  id: number;
  phone_number: string;
  called: string;
  created_at: string;
}

export interface AddNumberRequest {
  phone_number: string;
  audio_file: string; // base64 encoded
  text_content: string;
}

export const apiService = {
  // Get all phone numbers
  getAllNumbers: async (): Promise<NumberMapping[]> => {
    const response = await fetch(`${API_BASE_URL}/get-all-numbers`);
    const data = await response.json();
    return data.success ? data.data : [];
  },

  // Add new phone number
  addNumber: async (request: AddNumberRequest): Promise<NumberMapping> => {
    const response = await fetch(`${API_BASE_URL}/add-number`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to add number');
    return data.data;
  },
};

// Mock data for development
export const mockNumberMappings: NumberMapping[] = [
  {
    id: 1,
    phone_number: '+1234567890',
    audio_url: 'https://example.com/audio1.mp3',
    text_content: 'Thank you for calling! We will get back to you soon.',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    phone_number: '+0987654321',
    audio_url: 'https://example.com/audio2.mp3',
    text_content: 'Your call is important to us. Please expect a follow-up message.',
    created_at: '2024-01-16T14:20:00Z',
  },
];

export const mockCallLogs: CallLog[] = [
  {
    id: 1,
    phone_number: '+1111111111',
    called: '+1234567890',
    created_at: '2024-01-20T09:15:00Z',
  },
  {
    id: 2,
    phone_number: '+2222222222',
    called: '+1234567890',
    created_at: '2024-01-20T11:30:00Z',
  },
  {
    id: 3,
    phone_number: '+3333333333',
    called: '+0987654321',
    created_at: '2024-01-20T15:45:00Z',
  },
];