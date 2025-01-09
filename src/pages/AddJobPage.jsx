import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJobPage = ({ addJobSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('Under $50K');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    addJobSubmit(newJob);

    toast.success('Työilmoitus lisätty onnistuneesti');

    return navigate('/jobs');
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Lisää Työilmoitus</h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Työn Tyyppi
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3 bg-white'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='Kokopäivätyö'>Kokopäivätyö</option>
                <option value='Osa-aikatyö'>Osa-aikatyö</option>
                <option value='Etätyö'>Etätyö</option>
                <option value='Työharjoittelu'>Työharjoittelu</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
              Työkuva nimi
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2 bg-white'
                placeholder='eg. Web-Ohjelmoija, Marketointi Assistentti'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Kuvaus
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3 bg-white'
                rows='4'
                placeholder='Lisää työn kuvaus, toivomukset, vaatimukset, jne'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Palkka
              </label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3 bg-white'
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value='Työharjoittelu'>Työharjoittelu</option>
                <option value='Alle €50K'>Alle €50K</option>
                <option value='€50K - 60K'>€50K - €60K</option>
                <option value='€60K - 70K'>€60K - €70K</option>
                <option value='€70K - 80K'>€70K - €80K</option>
                <option value='€80K - 90K'>€80K - €90K</option>
                <option value='€90K - 100K'>€90K - €100K</option>
                <option value='€100K - 125K'>€100K - €125K</option>
                <option value='€125K - 150K'>€125K - €150K</option>
                <option value='€150K - 175K'>€150K - €175K</option>
                <option value='€175K - 200K'>€175K - €200K</option>
                <option value='Yli €200K'>Yli €200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
              Sijainti
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2 bg-white'
                placeholder='Yhtiön Sijainti'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <h3 className='text-2xl mb-5'>Yhtiön Info</h3>

            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2 '
              >
                Yhtiön Nimi
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3 bg-white'
                placeholder='Yhtiön Nimi'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='company_description'
                className='block text-gray-700 font-bold mb-2'
              >
                Yhtiön Kuvaus
              </label>
              <textarea
                id='company_description'
                name='company_description'
                className='border rounded w-full py-2 px-3 bg-white'
                rows='4'
                placeholder='Mitä yhtiönne tekee?'
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Yhtiön Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3 bg-white'
                placeholder='Email työntekijöitä varten'
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Yhtiön Puhelin
              </label>
              <input
                type='tel'
                id='contact_phone'
                name='contact_phone'
                className='border rounded w-full py-2 px-3 bg-white'
                placeholder='Puhelinnumero työntekijöitä varten'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Lisää Työilmoitus
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddJobPage;
