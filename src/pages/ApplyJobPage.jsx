import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const ApplyJobPage = ({ applyJobSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState('');
  const [additionalLinks, setAdditionalLinks] = useState(['']);
  const [job, setJob] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    // Fetch the user ID from the context or session storage
    const userId = sessionStorage.getItem('userId');
    setUserId(userId);
  }, []);

  const handleAddLink = () => {
    setAdditionalLinks([...additionalLinks, '']);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...additionalLinks];
    newLinks[index] = value;
    setAdditionalLinks(newLinks);
  };

  const submitApplication = (e) => {
    e.preventDefault();

    const application = {
      jobId: id,
      userId, // Include the user ID
      name,
      email,
      coverLetter,
      salaryExpectation,
      additionalLinks,
    };

    applyJobSubmit(application);

    toast.success('Hakemus lähetetty onnistuneesti');

    return navigate('/jobs');
  };

  return (
    <section className='bg-sky-50'>
      <div className='container m-auto max-w-4xl py-24'>
        <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 col-start-1 col-span-5'>
            <form onSubmit={submitApplication}>
              <h2 className='text-3xl text-center font-semibold mb-6'>Hae työpaikkaa</h2>

              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Nimi
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='border rounded w-full py-2 px-3 bg-white'
                  placeholder='Nimesi'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Sähköposti
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='border rounded w-full py-2 px-3 bg-white'
                  placeholder='Sähköpostisi'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='coverLetter'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Hakemuskirje
                </label>
                <textarea
                  id='coverLetter'
                  name='coverLetter'
                  className='border rounded w-full py-2 px-3 bg-white'
                  rows='4'
                  placeholder='Hakemuskirjeesi'
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                ></textarea>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='salaryExpectation'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Palkkatoive
                </label>
                <input
                  type='text'
                  id='salaryExpectation'
                  name='salaryExpectation'
                  className='border rounded w-full py-2 px-3 bg-white'
                  placeholder='Palkkatoiveesi'
                  required
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                />
              </div>

              {additionalLinks.map((link, index) => (
                <div className='mb-4' key={index}>
                  <label
                    htmlFor={`additionalLink-${index}`}
                    className='block text-gray-700 font-bold mb-2'
                  >
                    Linkki {index + 1}
                  </label>
                  <input
                    type='url'
                    id={`additionalLink-${index}`}
                    name={`additionalLink-${index}`}
                    className='border rounded w-full py-2 px-3 bg-white'
                    placeholder='Linkki'
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                </div>
              ))}

              <div className='mb-4'>
                <button
                  type='button'
                  className='flex items-center text-sky-500 hover:text-sky-600 font-bold'
                  onClick={handleAddLink}
                >
                  <FaPlus className='mr-2' /> Lisää Linkki
                </button>
              </div>

              <div>
                <button
                  className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Lähetä hakemus
                </button>
              </div>
            </form>
          </div>
          
          {job && (
            <aside className='bg-white p-8 rounded-lg shadow-md col-start-6 col-span-3'>
              <h3 className='text-xl font-bold mb-6'>Työpaikan tiedot</h3>
              <h2 className='text-2xl'>{job.title}</h2>
              <p className='my-2'>{job.description}</p>
              <hr className='my-4' />
              <h3 className='text-xl'>Palkka:</h3>
              <p className='my-2'>{job.salary} / Vuosi</p>
              <h3 className='text-xl'>Sijainti:</h3>
              <p className='my-2'>{job.location}</p>
              <h3 className='text-xl'>Yhtiö:</h3>
              <p className='my-2'>{job.company.name}</p>
            </aside>
          )}

        </div>
        
      </div>
    </section>
  );
};

export default ApplyJobPage;