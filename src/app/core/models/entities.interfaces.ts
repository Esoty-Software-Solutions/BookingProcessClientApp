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
export interface ISchedulesEntity {
  _id: string;
  doctorObject: IDoctorObjectEntityOrDoctorObject;
  scheduleCount: number;
  scheduleList?: ScheduleListEntity[] | null;
  medicalCenterObject?: MedicalCenterObjectEntity | null;
}
export interface IDoctorObjectEntityOrDoctorObject {
  _id: string;
  doctorId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  specialty: string;
  level: string;
  gender: string;
  birthDate: string;
  created: Created;
  isActive: boolean;
}
export interface Created {
  dateCreated: string;
  createdBy: string;
}
export interface ScheduleListEntity {
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
  created: Created;
  isActive: boolean;
  startDate: string;
  endDate: string;
  medicalCenterObject?: MedicalCenterObjectEntity[] | null;
  doctorObject?: IDoctorObjectEntityOrDoctorObject[] | null;
}
export interface MedicalCenterObjectEntity {
  _id: string;
  medicalCenterId: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phoneNumber?: string[] | null;
  email: string;
  googleMapLink: string;
  created: Created;
  isActive: boolean;
  description: string;
  facebookLink: string;
  website: string;
}
export interface Creation {
  dateCreated: string;
}
