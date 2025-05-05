import React from 'react';
import ViewPets from './ViewPets';

function ViewExotics() {
  return <ViewPets 
    petType="Exotico" 
    title="Pacientes Exóticos" 
    cardView={false}
  />;
}

export default ViewExotics;