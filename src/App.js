//import logo from './logo.svg';
//import Remarkable from 'remarkable';
//import React from 'react';
import './App.css';
import {EmployeeData} from './EmployeeData';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const[data,setData] = useState([]);
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[age,setAge]=useState(0)
  const[id,setId]=useState(0)
  const[isUPDATE,setIsUPDATE]=useState(false)


  useEffect(() => {setData(EmployeeData)},[]);

  const handleEDIT =(id) =>{
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setIsUPDATE(true)
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDELETE =(id) =>{
    if(id>0)
    {
      if(window.confirm("Are you sure to delete this item..")){

      
      const dt = data.filter(item => item.id !==id);
      setData(dt)
    }
  }
  }

  const handleSAVE =(e) =>{

    let error = '';

    if(firstName ==='')
      error += 'First Name is required'

    if(lastName ==='')
      error += 'Last Name is required'

    if(age <= 0)
      error += 'Age is required'

      if(error === '')
        {

         e.preventDefault()
         const dt =[...data];
         const newobject={
         id:EmployeeData.length + 1,
         firstName:firstName,
         lastName:lastName,
         age:age
    }
         dt.push(newobject);
         setData(dt);
  }
  else{
    alert(error)
  }
  }
  
  const handleUPDATE =() =>{
    const index = data.map((item) =>{
      return item.id
    }).indexOf(id);
    const dt = [...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    dt[index].age=age;

    setData(dt);
    handleCLEAR();
  }


  const handleCLEAR =() =>{
    setId(0);
      setFirstName('');
      setLastName('');
      setAge('');
      setIsUPDATE(false);
  }


  return (
    <div className="App">
      <div style={{display:'flex',justifyContent:'center',marginTop:"10px",marginBottom:"10px"}}>
        <div>
          <lavel>First Name:
            <input type='text' placeholder='Enter First name' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
          </lavel>
        </div>
        <div>
          <lavel>Last Name:
            <input type='text' placeholder='Enter Last name' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
          </lavel>
        </div>
        <div>
          <lavel>Age:
            <input type='text' placeholder='Age' onChange={(e) => setAge(e.target.value)} value={age}/>
          </lavel>
        </div>
        <div>
          {
            !isUPDATE ?
            <button className='btn btn-primary' onClick={(e)=>handleSAVE(e)}>SAVE</button>
            :
            <button className='btn btn-primary' onClick={()=>handleUPDATE()}>UPDATE</button>
          }
        
        {/* <button className='btn btn-primary' onClick={()=>handleUPDATE()}>UPDATE</button> */}
        <button className='btn btn-danger'onClick={()=>handleCLEAR()}>CLEAR</button>

        </div>

      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index) => {
              return(
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=>handleEDIT(item.id)}>EDIT</button>&nbsp;
                    <button className='btn btn-danger'onClick={()=>handleDELETE(item.id)}>DELETE</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
