import './App.css';
import { useState } from 'react';
import Selected from './Selected';


function App() {
  const [myStdnts, setMyStdnts] = useState([])
  const [age, setAge] = useState(0)
  const [name, setName] = useState("")
  const [selectedStdnt, setMySelected] = useState([])


  const SERVER = "http://localhost:3004/students"


  const addStdnt = (ind) => {
    console.log(ind)
    setMySelected([...selectedStdnt, myStdnts[ind]])
  }
  const getDataFromServer = async () => {
    setMyStdnts(await fetch(SERVER)
      .then(response => response.json()))

  }
  const addData2Server = () => {
    const data = {
      "name": name,
      "age": age
    };
    console.log(JSON.stringify(data))
    fetch(SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteFromDB = (id) => {
    // let students = myStudents
    fetch(`http://localhost:3004/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(response => {
        return response.json()
      })
  }



  return (

    <div >
      <button onClick={() => getDataFromServer()}>Get data</button>
      <button onClick={() => addData2Server()}>add data</button>
      name:<input value={name} onChange={(e) => setName(e.target.value)} />
      age:<input value={age} onChange={(e) => setAge(e.target.value)} />
      {/* <Cart cartLst={myCart} delc={delProd} style={{ display: "inline" }}></Cart> */}
      <hr></hr>
      <div style={{ display: "inline" }}>
        {myStdnts.map((stdnt, ind) =>
          <div key={ind}> {stdnt.name}{" "}{stdnt.age}
            <button onClick={() => addStdnt(ind)}>   Select</button>
          </div>)}
      </div>
      <hr></hr>
      <Selected stdntLst={selectedStdnt} deleteFromDB={deleteFromDB}></Selected>

    </div>
  );
}

export default App;
