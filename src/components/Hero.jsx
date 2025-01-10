import PropTypes from 'prop-types';

const Hero = ({
  title = 'Työpaikat Suomessa', 
  subtitle = 'Löydä työpaikka joka on kuin sinulle tehty',
  backgroundImage,
}) => {
  return (
    <section className='bg-sky-700 py-20 mb-1 rounded-lg'
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='my-4 text-xl text-white'>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
};
export default Hero;
