export interface Authentication {
  user_id?: number;
  email: string;
  password?: string; // Omitted in responses for security
  phone_number?: string;
  otp_verified?: boolean;
  role?: 'user' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user_id: number;
  role: 'user' | 'admin';
}

export interface RoomRegistration {
  room_id?: number;
  room_type?: string;
  block?: string;
  level?: number;
  number?: number;
  status?: 'available' | 'booked';
}

export interface RoomBooking {
  booking_id?: number;
  user_id?: number;
  room_id?: number;
  start_date?: string; // ISO date string (e.g., '2025-09-01')
  end_date?: string;
  approval_status?: 'Pending' | 'Approved' | 'Rejected';
  payment_details?: {
    amount?: number;
    method?: string;
    transaction_id?: string;
  };
}

export interface HallBooking {
  booking_id?: number;
  user_id?: number;
  booking_date?: string; // ISO date string
  booking_time?: string; // Time string (e.g., '14:00:00')
  approval_status?: 'Pending' | 'Approved' | 'Rejected';
  payment_details?: {
    amount?: number;
    method?: string;
    transaction_id?: string;
  };
}

export interface ApplianceItem {
  type: string;
  qty: number;
}

export interface ElectricalAppliance {
  appliance_id?: number;
  user_id?: number;
  appliance_list: ApplianceItem[];
  total_amount?: number;
  payment_details?: {
    amount?: number;
    method?: string;
    transaction_id?: string;
  };
}

export interface ReportDamage {
  report_id?: number;
  user_id?: number;
  image_path?: string;
  type_of_damage?: string;
  description?: string;
  status?: 'Draft' | 'Submitted' | 'Progress' | 'Completed';
}

export interface Feedback {
  feedback_id?: number;
  user_id?: number;
  college_rating: number;
  accommodation_rating: number;
  facilities_rating: number;
  recommendation?: string;
}
