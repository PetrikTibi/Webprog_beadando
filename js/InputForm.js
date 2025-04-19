import React from 'react';

const InputForm = ({ name, setName, height, setHeight, weight, setWeight, id, setId, handleCreate, handleUpdate, handleDelete, handleGetDataForId }) => {
  return (
    <div id="form-section">
      <input type="text" id="idField" placeholder="ID (módosításhoz)" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={handleGetDataForId}>Adatok betöltése ID alapján</button><br />
      <input type="text" placeholder="Név" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Magasság" value={height} onChange={e => setHeight(e.target.value)} />
      <input type="text" placeholder="Súly" value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={handleCreate}>Létrehozás</button>
      <button onClick={handleUpdate}>Módosítás</button>
      <button onClick={handleDelete}>Törlés</button>
    </div>
  );
};

export default InputForm;
