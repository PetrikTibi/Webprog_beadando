import React from 'react';

const DataList = ({ data }) => {
  return (
    <div>
      {data.length > 0 && data.map((person) => (
        <div key={person.id}>
          {person.id} - {person.name}, {person.height} cm, {person.weight} kg
        </div>
      ))}
    </div>
  );
};

export default DataList;
