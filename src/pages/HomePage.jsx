import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';
import bgImage from '../assets/bgImage.jpg';

const HomePage = () => {
  return (
    <>
      <Hero         
        title='Työpaikat Suomessa'
        subtitle='Löydä juuri sinulle sopiva työpaikka'
        backgroundImage={bgImage}/>
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};
export {HomePage};
