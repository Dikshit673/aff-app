import Graph from '@/components/Graph';

export default function Dashboard() {
  return (
    <section className='min-h-screen bg-gray-600/20 py-4'>
      <div className='mx-auto w-9/10'>
        <h1 className='mb-4 text-2xl font-bold'>Dashboard</h1>
        <div className='grid grid-cols-2'>
          <div className='rounded-lg bg-white py-8 shadow-lg shadow-gray-800'>
            <Graph />
          </div>
        </div>
      </div>
    </section>
  );
}
