import React, { useEffect, useState } from 'react'

import DogImage from './components/DogImage';
import "./App.css"

export default function DogImageGallery() {

    const [showResults, setShowResults] = useState(false);

  const handleSearchResults = (resultsVisible) => {
    setShowResults(resultsVisible);
  };
 
  return (
    <div className='container'>   
    
    

      <DogImage onSearchResults={handleSearchResults} />
      
      {!showResults && <FirstPage />}
      
    </div>
  );
}







 function FirstPage() {
  const [imageURL, setImageURL] = useState ([])

  useEffect(()=>{
    
    fetch ("https://dog.ceo/api/breed/hound/images/random/12")
    .then((data)=> data.json())
    .then ((poster)=>setImageURL(poster.message))
  },[] )
  return (
    

  <div className='master-container'>
      
      <div className="image-gallery">        
       { 
       imageURL.map ((url, )=>( <img className='Dog-poster' key= "index " src= {url}  alt='Hound Dog'/>)
       )}

     </div>  
     </div>
      

  )
}





