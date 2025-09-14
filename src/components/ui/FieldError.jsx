export default function FieldError({ error, id }) {
  return <p id={id} className='mt-1 min-h-4 text-xs text-red-400' style={{ visibility: error ? 'visible' : 'hidden' }}>{error?.message}</p>
}