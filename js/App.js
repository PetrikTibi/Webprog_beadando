import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import DataList from './DataList';
import MessageDisplay from './MessageDisplay';

const code = "SSDPW9xyz123";
const apiUrl = "http://gamf.nhely.hu/ajax2/";

const App = () => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const validateInputs = () => {
    if (!name || !height || !weight) {
      setMessage("Minden mező kitöltése kötelező.");
      return false;
    }
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
      setMessage("A mezők max. 30 karakter hosszúak lehetnek.");
      return false;
    }
    return true;
  };

  const fetchData = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ op: "read", code })
    })
    .then(res => res.json())
    .then(data => setData(data.list || []));
  };

  const handleCreate = () => {
    if (!validateInputs()) return;
    const data = {
      op: "create",
      code,
      name,
      height,
      weight
    };
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(res => {
      setMessage("Sikeres létrehozás.");
      fetchData();
    });
  };

  const handleUpdate = () => {
    if (!validateInputs()) return;
    if (!id) return setMessage("Adja meg a módosítandó ID-t.");
    const data = {
      op: "update",
      code,
      id,
      name,
      height,
      weight
    };
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(res => {
      setMessage("Sikeres módosítás.");
      fetchData();
    });
  };

  const handleDelete = () => {
    if (!id) return setMessage("Adja meg a törlendő ID-t.");
    const data = {
      op: "delete",
      code,
      id
    };
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(res => {
      setMessage("Sikeres törlés.");
      fetchData();
    });
  };

  const handleGetDataForId = () => {
    if (!id) return setMessage("Adja meg az ID-t.");
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ op: "read", code })
    })
    .then(res => res.json())
    .then(data => {
      const found = data.list.find(row => row.id === id);
      if (found) {
        setName(found.name);
        setHeight(found.height);
        setWeight(found.weight);
        setMessage("Adatok betöltve.");
      } else {
        setMessage("Nem található adat az ID alapján.");
      }
    });
  };

  return (
    <div>
      <h2>React Adatkezelés</h2>
      <InputForm 
        name={name} setName={setName}
        height={height} setHeight={setHeight}
        weight={weight} setWeight={setWeight}
        id={id} setId={setId}
        handleCreate={handleCreate} handleUpdate={handleUpdate}
        handleDelete={handleDelete} handleGetDataForId={handleGetDataForId}
      />
      <MessageDisplay message={message} />
      <DataList data={data} />
    </div>
  );
};

export default App;
