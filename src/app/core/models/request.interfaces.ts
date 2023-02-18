export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IBaseFilterRequest {
  limit?: number;
  searchQuery?: string;
  starting_after_object?: string;
  skip?: number;
}
export interface ICreateAMedicalCenter {
  name: string;
  city: string;
  district: string;
  description: string;
  address: string;
  phoneNumber?: string[] | null;
  email: string;
  facebookLink: string;
  googleMapLink: string;
  website: string;
}
export interface IFilterSchedulesRequest extends IBaseFilterRequest {
  doctorId?: string;
  medicalCenterId?: string;
  sortBy?: 'doctor' | 'medicalCenter';
  specialty?: string;
  city?: string;
  fromDate?: string;
  toDate?: string;
  timeSlot?: string;
}
export interface IAddScheduleRequest {
  medicalCenterId: string;
  doctorId: string;
  timeslot: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  price: string;
  startDate: string;
  endDate: string;
}
export interface ICreateScheduleRequest {
  medicalCenterId: string;
  doctorId: string;
  timeslot: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  price: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}
export interface ICreateNewDoctor {
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  level: string;
  gender: string;
  birthdate: string;
}
export interface IDoctorFilterRequest extends IBaseFilterRequest {
  specialty?: string;
  level?: string;
  city?: string;
}
