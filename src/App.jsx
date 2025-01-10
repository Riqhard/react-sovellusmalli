import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useRouteError, Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/Auth';  
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Users } from './pages/Users'
import { Confirmed } from './pages/Confirmed'
import { Confirm } from './pages/Confirm'
import { Unconfirmed } from './pages/Unconfirmed'
import { Private, Admin } from './pages/PrivateRoute'
import { closeFetch } from './components/functions'
import { loaderCsrfToken, loaderConfirm } from './components/functions'   
import { JobsPage } from './pages/JobsPage'
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';
import { MainLayout } from './layouts/MainLayout';
import { HomePage }  from './pages/HomePage';
import ApplyJobPage from './pages/ApplyJobPage';
import UserApplicationsPage from './pages/UserApplicationsPage';

const basename="/projektit_react/react-sovellusmalli"

const ErrorBoundary = () => {
  const error = useRouteError()
  console.log('Virhe:', error)
  return (
    <div>
      <h2>Jokin meni pieleen!</h2>
      <p>{error.message}</p>
    </div>
  )
}

const addJob = async (newJob) => {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJob),
  });
  console.log('addJob:',res);
  return;
};

// Delete Job
const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
  return;
};

// Update Job
const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  return;
};

const submitApplication = async (application) => {
  const res = await fetch('/haetaan/haetaan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });
  console.log('submitApplication:',res);
  return;
};

const router = createBrowserRouter( 
  createRoutesFromElements(
  <Route path="/" element={<MainLayout />} errorElement={<ErrorBoundary />}>
    <Route index element={<HomePage />} />
    <Route path='jobs' element={<JobsPage />}/>
    <Route path='/add-job' element={<Private><AddJobPage addJobSubmit={addJob} /></Private>} />
    <Route
          path='/edit-job/:id'
          element={<Private><EditJobPage updateJobSubmit={updateJob} /></Private>}
          loader={jobLoader}
        />
    <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
    <Route path='/apply-job/:id' element={<ApplyJobPage applyJobSubmit={submitApplication}/>} />
    <Route path='/user-applications' element={<Private><UserApplicationsPage /></Private>} />

    <Route path="login" element={<Login/>} loader={loaderCsrfToken} />
    <Route path="signup" element={<Signup/>} loader={loaderCsrfToken} />
    <Route path="users" element={<Admin><Users/></Admin>} loader={loaderConfirm}/>
    <Route path="confirmed" element={<Confirmed/>}/>
    <Route path="confirm" element={<Private><Confirm/></Private>} loader={loaderConfirm}/>
    <Route path="unconfirmed" element={<Private><Unconfirmed/></Private>}/>
    <Route path='*' element={<NotFoundPage />} />
  </Route>
  ), {
    basename: basename, // Aseta basename
})

const App = () => {
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  const [authConfirm, setAuthConfirm] = useState(localStorage.getItem('confirm'));
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
 /* Tyhjennetään state poistuttessa */


  const setTokens = (data,navigate) => {
    /* Huom. kutsu pelkällä datalla toimii. */
    console.log('setTokens:',data)
    /* Huom. logout kutsuu setTokens-funktiota ilman dataa,
       jolloin authTokens-alkuarvoksi tulisi merkkijono 'undefined'. 
       Tässä removeItem tuottaa authTokens-alkuarvoksi null,
       jolloin sen boolean arvo on oikein false. */
    if (data) {
      sessionStorage.setItem("tokens", JSON.stringify(data));
      }
    else {
      closeFetch();
      sessionStorage.removeItem("tokens");
      console.log('setTokens,logout')
      /* 
      Pyritään estämään kirjautuminen samalle sivulle, jolta poistuttiin
      tyhjentämällä react-router-domin useLocation state. Samoin
      myös Kirjaudu-painikkeen yhteydessä.  Uudessa router-ratkaisussa
      useNavigate on kutsuttava router-kontekstissa, joten
      navigate on tuotu parametrina logout-funktiosta.
      */  
      navigate('/',{})  
      }   
    setAuthTokens(data);
    }

    const setConfirm = data => {
      console.log('setConfirm:',data)
      if (data) localStorage.setItem("confirm", JSON.stringify(data));
      else localStorage.removeItem("confirm");  
      setAuthConfirm(data);
      }

  return (
  <AuthContext.Provider value={ {authTokens,setAuthTokens:setTokens,authConfirm,setAuthConfirm:setConfirm }}>  
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </AuthContext.Provider>
  )
}

export default App;
