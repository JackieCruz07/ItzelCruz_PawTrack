import React from 'react';
import ViewPets from './ViewPets';

function ViewDogs() {
  return <ViewPets 
    petType="dogs" 
    title="Pacientes Perrunos" 
    cardView={true}
  />;
}

export default ViewDogs;