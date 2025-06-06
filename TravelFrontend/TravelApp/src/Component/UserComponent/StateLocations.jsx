import React, { use, useContext, useEffect } from "react";
import { AppContext } from "../../CreateContext/Context";
import { getStateLocation } from "../../service/locationService";

const StateLocations = () => {

  const{statebaseLocation, setStatebaseLocation} = useContext(AppContext);

  useEffect(() => {
    async function fetchStateLocation(){
      const response = await getStateLocation();
      const data = await response.son();
      console.log(data);
    } 
    fetchStateLocation();
  }, [])

  return (
    <>
      <h1>StateLocations</h1>
    </>
  );
};

export default StateLocations;
