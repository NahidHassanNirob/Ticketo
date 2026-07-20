export const getEvents=async(email)=>{
    console.log(email,"email")
    const res=await fetch(`http://localhost:8000/api/events/${email}`);
    return res.json();
}