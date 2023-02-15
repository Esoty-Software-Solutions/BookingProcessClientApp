export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IBaseFilterRequest {
  limit?: number;
  searchQuery?: string;
  starting_after_object?: string;
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
export interface IFilterMedicalCentersRequest extends IBaseFilterRequest {
  city?: string;
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
