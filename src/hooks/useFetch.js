import { useEffect, useState } from 'react'

export function useFetch(initialUrl) {
	const [ data, setData ] = useState();
	const [ url, setUrl] = useState(initialUrl || null);
	const [ error, setError] = useState(null);
    const authentication = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGE3OWJmZWM5YTBkZDQ3YjQxYjJmOThjYzY4OTVhOSIsInN1YiI6IjY0NmJkNWE4MzNhMzc2MDExZWM0ZmZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8i7o42PmAZqsx5anVrNFswza3suNNBCFcUac5cMbgJ0'
        }
      };
	useEffect(() => {
		if (!url) {
			return;
		}
		fetch(url, authentication)
			.then(res => res.json())
			.then(data => {
				setData(data);
			})
			.catch(e => {
				setError(e);
			});

	}, [url]);

	return [{ data, error }, setUrl];
};