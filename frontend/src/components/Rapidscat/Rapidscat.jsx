import React, { useEffect, useState } from "react";
import sateliteImg from "../../assets/satelite1.jpg";

const Rapidscat = () => {
  const [apodData, setApodData] = useState(null);
    console.log(apodData)
  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=azrcPSop2fVRo8dUmVX7uwbWHAL2Qdu0xybgtiM7")
      .then((response) => response.json())
      .then((data) => setApodData(data))
      .catch((error) => console.error("Error fetching APOD data: ", error));
  }, []);

  return (
    <>
      <section className="bg-primary text-white pb-12">
        <div className="container ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div data-aos="zoom-in">
              {apodData && (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="w-full sm:w-[80%] mx-auto max-h-[350px] object-cover"
                />
          
                
              )}
            </div>
            <div className="space-y-3 xl:pr-36 p-4 border-r-2 border-b-2 border-r-sky-800 border-b-sky-800 ">
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-sky-800 uppercase"
              >
                 {apodData && (
                <h1>{apodData.date}</h1>
                  
            )}
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="500"
                className="uppercase text-5xl"
              >
                 {apodData && (
                <h1>{apodData.title}</h1>
                  
            )}
             
              </h1>

              {apodData && (
               
                  
           
              <p data-aos="fade-up" data-aos-delay="700">
              {apodData.explanation}
              </p>

)}
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rapidscat;
