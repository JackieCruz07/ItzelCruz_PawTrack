import React from 'react';
import ViewPets from './ViewPets';

function ViewCats() {
  return <ViewPets 
    petType="Gato" 
    title="Michi Pacientes" 
    cardView={true}
  />;
}
export default ViewCats;