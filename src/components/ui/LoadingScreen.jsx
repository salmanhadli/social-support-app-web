export default function LoadingScreen() {
  return (
    <div data-testid='loading-screen' className='fixed inset-0 bg-[rgb(var(--primary-color-end-rgb))] flex items-center justify-center z-50'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--accent-color)]'></div>
    </div>
  )
}