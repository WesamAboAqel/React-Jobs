
import React from 'react'
import {Route,
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider,
        useNavigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFound from './pages/NotFound';
import {JobPage, jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  

  // Add New Job
  const addJob = async (newData) => {
    const {newJob, newCompany} = newData
    const responseCompany = await fetch('/api/addCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompany)
      })
    
    // const companies = await fetch('/api/getCompanies')
    // const companyData = await companies.json();
    //console.log(companyData.length)
    // const lastCompanyAdded = companyData[companyData.length - 1];
    // const company_id = lastCompanyAdded.id;
    const id = await responseCompany.json();
    //console.log(id)
    newJob["company_id"] = parseInt(id);
    //console.log(newJob)


    const responseJob = await fetch('/api/addJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob)
      })
    return;
  }

  //Delete Job
  const deleteJob = async (id) => {
    const response = await fetch(`/api/deleteJob/${id}`, {
      method: 'DELETE'
    })
    return 
  }

  //Update Job
  const updateJob = async (data) => {
    
    const response = await fetch(`/api/updateJobandCompany/${data.updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path='/jobs' element={<JobsPage />} />
    <Route path='/edit-job/:id' element={<EditJobPage  updateJobSubmit={updateJob}/>} loader={jobLoader} />
    <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
    <Route path='/job/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
    <Route path='*' element={<NotFound />} />
    </Route>
    )
  );
  return <RouterProvider router ={router}/>;
}

export default App