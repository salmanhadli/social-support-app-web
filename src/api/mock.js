import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the axios instance
export default (axiosInstance) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

  // Mock for application submission
  // It can simulate success and error responses
  mock.onPost('/applications').reply((config) => {
    try {
      const data = JSON.parse(config.data);
      // Simulate a validation error for demonstration
      if (!data || !data.personalInfo?.name || data.personalInfo.name.trim() === '') {
        return [400, { message: 'Validation Error: Name is a required field.' }];
      }
      return [200, { ok: true, id: `mock-${Date.now()}` }];
    } catch (e) {
      return [400, { message: 'Invalid request body.' }];
    }
  });
};