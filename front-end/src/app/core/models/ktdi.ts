export type Authentication = {
  user_id: number;
  email: string;
  password: string;
  phone_number?: string;
  otp_verified?: boolean;
  role?: 'user' | 'admin';
}

export type LoginCredentials = {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user_id: number;
  role: 'user' | 'admin';
}

export type RoomRegistration = {
  room_id?: number;
  room_type?: string;
  block?: string;
  level?: number;
  number?: number;
  status?: 'available' | 'booked';
}

export type RoomBooking = {
  booking_id: number;
  user_id: number;
  room_id: number;
  start_date: string; // ISO date string (e.g., '2025-09-01')
  end_date: string;
  approval_status: 'Pending' | 'Approved' | 'Rejected';
  payment_details: {
    amount: number;
    method: string;
    transaction_id: string;
  };
}

export type HallBooking ={
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

export type ApplianceItem = Required<{
  type: string;
  qty: number;
}>

export type ElectricalAppliance = {
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

export type ReportDamage = {
  report_id?: number;
  user_id?: number;
  image_path?: string;
  type_of_damage?: string;
  description?: string;
  status?: 'Draft' | 'Submitted' | 'Progress' | 'Completed';
}

export type Feedback = {
  feedback_id?: number;
  user_id?: number;
  college_rating: number;
  accommodation_rating: number;
  facilities_rating: number;
  recommendation?: string;
}
