import { Link } from 'react-router-dom';
import Card from './Card';

const HomeCards = () => {
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card>
            <h2 className='text-2xl font-bold'>Työnhakija</h2>
            <p className='mt-2 mb-4'>
              Selaa avoimia työilmoituksia ja aloita urasi jo tänään.
            </p>
            <Link
              to='/jobs'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Selaa Työilmoituksia
            </Link>
          </Card>
          <Card bg='bg-sky-100'>
            <h2 className='text-2xl font-bold'>Työnantajat</h2>
            <p className='mt-2 mb-4'>
              Lisää työilmoitus ja löydä teille sopiva työntekijä.
            </p>
            <Link
              to='/add-job'
              className='inline-block bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-sky-600'
            >
              Lisää Työilmoitus
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
