export function submitApplication() {
  // axios mock with interceptor or fetch
  // mock API call
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, id: 'mock-123' }), 1000)
  })
}
