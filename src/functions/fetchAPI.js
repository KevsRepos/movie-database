export const fetchAPI = async (url, data) => {
  const res = await fetch("http://localhost:3005/api/" + url, {
    headers: {
      "Authorization": "Basic Og==",
      "Content-Type": "application/json" 
    },
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  });
  
  if(res.status === 200) return await res.json();
  else throw new Error(res.status);
}