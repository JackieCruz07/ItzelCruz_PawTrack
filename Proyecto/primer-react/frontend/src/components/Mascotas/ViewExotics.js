import React from 'react';
import ViewPets from './ViewPets';

function ViewExotics() {
  return <ViewPets 
    petType="exotics" 
    title="Pacientes Exóticos" 
    cardView={false}
  />;
}

export default ViewExotics;