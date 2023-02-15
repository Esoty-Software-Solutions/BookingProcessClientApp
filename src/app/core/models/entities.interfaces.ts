export interface IMedicalCenterEntity {
  _id: string;
  rowNumber: number;
  medicalCenterId: string;
  name: string;
  city: string;
  district: string;
  description: string;
  address: string;
  phoneNumber?: string[] | null;
  email: string;
  facebookLink: string;
  googleMapLink: string;
  created: ICreated;
  updated: IUpdated;
  isActive: boolean;
}
export interface ICreated {
  dateCreated: string;
  createdBy: string;
}
export interface IUpdated {
  dateLastUpdated: string;
  updatedBy: string;
}
export interface ISchedulesEntity {
  _id: string;
  scheduleId: string;
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
  price: number;
  created: ICreated;
  isActive: boolean;
  startDate: string;
  endDate: string;
  medicalCenterObject: IMedicalCenterEntity;
  doctorObject: IDoctorEntity;
}
export interface IMedicalCenterEntity {
  _id: string;
  medicalCenterId: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phoneNumber?: string[] | null;
  email: string;
  googleMapLink: string;
  created: ICreated;
  isActive: boolean;
}
export interface IDoctorEntity {
  _id: string;
  doctorId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  level: string;
  gender: string;
  birthDate: string;
  created: ICreated;
  isActive: boolean;
}
