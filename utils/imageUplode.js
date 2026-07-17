import toast from "react-hot-toast";

export const uplodeImage=async(imageFile)=>{
 const formdata=new FormData();
  formdata.append("image", imageFile);
  const response=await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,{
    method:'POST',
    body:formdata
  })
  const data=await response.json();
 
  if(data.success){
    return data.data.url;
  }
  toast.error('Image upload failed')

}