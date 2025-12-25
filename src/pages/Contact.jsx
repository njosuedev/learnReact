import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [f,setF]=useState({name:"",email:"",message:""}),[l,s]=useState(false),[sc,ss]=useState(false);
  const h=e=>setF({...f,[e.target.name]:e.target.value});
  const submit=async e=>{e.preventDefault();s(true);ss(false);
    try{
      const r=await fetch("http://localhost:5000/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)});
      if(r.ok){ss(true);setF({name:"",email:"",message:""});}
      else alert("Error");}catch{alert("Error");}finally{s(false);}
  }
  return <div className="p-8 max-w-2xl mx-auto bg-gray-50 rounded-2xl">
    <div className="mb-6 flex flex-col gap-3">
      <div><Mail/> higoverse@gmail.com</div>
      <div><Phone/> +250 7xx xxx xxx</div>
      <div><MapPin/> Kigali, Rwanda</div>
    </div>
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input name="name" value={f.name} onChange={h} placeholder="Name" className="p-3 rounded border"/>
      <input name="email" value={f.email} onChange={h} placeholder="Email" className="p-3 rounded border"/>
      <textarea name="message" value={f.message} onChange={h} placeholder="Message" className="p-3 rounded border"/>
      <button type="submit" disabled={l} className="bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2">
        {l?"Sending...":"Send"} <Send size={16}/>
      </button>
      {sc && <p className="text-green-600 text-center">Sent!</p>}
    </form>
  </div>
}
