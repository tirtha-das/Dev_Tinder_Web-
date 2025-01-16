const Usercard = ({userData})=>{
 // console.log(userData);
  
  const {fname,lname,photoURL,age,gender,about} = userData;
  const hideButton = (userData?.hideButton || 0)
 // console.log(fname);
  

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
           <figure>
             <img
               src={photoURL}
               alt="Shoes" />
           </figure>
           <div className="card-body">
             <h2 className="card-title">{fname} {lname}</h2>
             {age && gender && <p className="capitalize">{age} , {gender}</p>}
             <p>{about}</p>
             {!hideButton && <div className="card-actions justify-center">
             <button className="btn btn-primary text-lg">Ignore</button>
               <button className="btn btn-secondary text-lg">Invite</button>
             </div>}
           </div>
         </div>        
    )
}

export default Usercard;