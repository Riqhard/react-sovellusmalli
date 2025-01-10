import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user ID from the context or session storage
    const userId = sessionStorage.getItem('userId');
    setUserId(userId);

    const fetchApplications = async () => {
      const res = await fetch('/api/user/applications');
      const data = await res.json();
      // Filter applications to only include those with the current user's ID
      const userApplications = data.filter(application => application.userId === userId);
      setApplications(userApplications);
    };

    fetchApplications();
  }, []);

  return (
    <section className='bg-sky-50'>
      <div className='container m-auto max-w-4xl py-24'>
        <h2 className='text-3xl text-center font-semibold mb-6'>Omat Hakemukset</h2>
        <div className='grid grid-cols-1 gap-4'>
          {applications.map((application) => (
            <div key={application.id} className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border'>
              <h3 className='text-xl font-bold'>{application.jobTitle}</h3>
              <p className='my-2'>Päivämäärä: {new Date(application.date).toLocaleDateString()}</p>
              <p className='my-2'>Palkkatoive: {application.salaryExpectation}</p>
              <button
                className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => navigate(`/jobs/${application.jobId}`)}
              >
                Näytä työpaikka
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserApplicationsPage;
