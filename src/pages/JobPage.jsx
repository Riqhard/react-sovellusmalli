import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../context/Auth";

const JobPage = ({ deleteJob }) => {
  const { authTokens } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      'Oletko varma että haluat poistaa listauksen?'
    );

    if (!confirm) return;

    deleteJob(jobId);

    toast.success('Työilmoitus poistettu');

    navigate('/jobs');
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobs'
            className='text-sky-500 hover:text-sky-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Takaisin työpaikkoihin
          </Link>
        </div>
      </section>

      <section className='bg-sky-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-sky-800 text-lg font-bold mb-6'>
                  Työpaikan kuvaus
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-sky-800 text-lg font-bold mb-2'>
                  Palkka
                </h3>

                {job.salary} {job.salary !== "Työharjoittelu" && "/ Vuosi"}


                <Link
                    to={`/apply-job/${job.id}`}
                    className='bg-sky-500 hover:bg-sky-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Hae työpaikkaa
                  </Link>
              </div>

            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Yhtiön Info</h3>

                <h2 className='text-2xl'>{job.company.name}</h2>

                <p className='my-2'>{job.company.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Email:</h3>

                <p className='my-2 bg-sky-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>

                <h3 className='text-xl'>Puhelin:</h3>

                <p className='my-2 bg-sky-100 p-2 font-bold'>
                  {' '}
                  {job.company.contactPhone}
                </p>
              </div>


              {authTokens && (
                <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                  <h3 className='text-xl font-bold mb-6'>Managerointi</h3>
                  <Link
                    to={`/edit-job/${job.id}`}
                    className='bg-sky-500 hover:bg-sky-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >
                    Editoi Työilmoitusta
                  </Link>
                  {authTokens === "ADMIN" && (
                    <button
                      onClick={() => onDeleteClick(job.id)}
                      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                    >
                      Poista Työilmoitus
                    </button>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
