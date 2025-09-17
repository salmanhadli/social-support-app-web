import axiosInstance from './axiosInstance';

export function submitApplication(applicationData) {
  return axiosInstance.post('/applications', applicationData);
}
