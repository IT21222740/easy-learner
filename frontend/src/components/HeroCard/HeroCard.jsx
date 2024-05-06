import React, { useState, useEffect } from "react";
import wave from "../../assets/wave Gif.gif";

const HeroCard = () => {
  const [apodData, setApodData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("NAVCAM");

  useEffect(() => {
    fetchApodData();
  }, [selectedCamera]); // Fetch data whenever selectedCamera changes

  const fetchApodData = () => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=azrcPSop2fVRo8dUmVX7uwbWHAL2Qdu0xybgtiM7&camera=${selectedCamera}&page=1`)
      .then((response) => response.json())
      .then((data) => setApodData(data.photos))
      .catch((error) => console.error("Error fetching APOD data: ", error));
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  return (
    <section className="bg-primary py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Mars Rover Images</h2>
          <p className="text-lg text-gray-300">Select the camera:</p>
          {/* Select statement to choose camera */}
          <select
            value={selectedCamera}
            onChange={handleCameraChange}
            className="mt-2 px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-800 focus:outline-none focus:border-blue-500"
          >
            <option value="NAVCAM">NAVCAM</option>
            <option value="FHAZ">FHAZ</option>
            <option value="RHAZ">RHAZ</option>
            <option value="MAST">MAST</option>
            <option value="CHEMCAM">CHEMCAM</option>
            <option value="MAHLI">MAHLI</option>
            <option value="MARDI">MARDI</option>
            <option value="PANCAM">PANCAM</option>
            <option value="MINITES">MINITES</option>
            {/* Add other camera options here */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {apodData.map((data, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-sky-900/60 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <img
                key={index}
                src={data.img_src}
                alt={data.id}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{data.rover.name}</h3>
                <p className="text-gray-300">{data.earth_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        src={wave}
        alt=""
        className="h-[200px] w-full object-cover mix-blend-screen -translate-y-24"
      />
    </section>
  );
};

export default HeroCard;
