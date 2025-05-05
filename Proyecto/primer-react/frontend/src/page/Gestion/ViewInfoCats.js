import React from 'react';
import ViewInfoPets from './ViewInfoPets';

function ViewInfoCats() {
  return (
    <ViewInfoPets 
      petType="Gato" 
      title="Registro de Gatos" 
    />
  );
}

export default ViewInfoCats;