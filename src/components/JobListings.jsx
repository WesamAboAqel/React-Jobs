import React from 'react'
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

import JobListing from './JobListing'

const jobsLoader = async ({isHome}) => {
  const apiUrl = isHome ? '/api/getJobs?_limit=3' : '/api/getJobs';
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

const JobListings = ({isHome = false}) => {
  const [jobs,setJobs] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try{
        await new Promise(resolve => setTimeout(resolve, 250));
        const data = await jobsLoader({isHome})
        setJobs(data);
      }catch (error) {
        console.log('Error Fetching data', error)
      }finally {
        setLoading(false);
      }
    }
    fetchJobs();
  },[])
  return (
    <>
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        { isHome ? 'Recent Jobs':'Browse Jobs'}
      </h2>
      
        { loading ? (<Spinner loading={loading} />) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { jobs.map((job) => (
            <JobListing key={job.id} job={job} />
        ))}
        </div>
      )}
    </div>
  </section>
  </>
  )
}

export default JobListings