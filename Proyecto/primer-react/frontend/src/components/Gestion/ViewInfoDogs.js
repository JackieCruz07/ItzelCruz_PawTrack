import React from 'react';
import ViewInfoPets from './ViewInfoPets';

function ViewInfoDogs() {
  return (
    <ViewInfoPets 
      petType="dogs" 
      title="Registro de Perros" 
    />
  );
}

export default ViewInfoDogs;