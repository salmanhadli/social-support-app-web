export default function LoadingScreen() {
  return (
    <div className='fixed inset-0 bg-gray-900 flex items-center justify-center z-50'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500'></div>
    </div>
  )
}