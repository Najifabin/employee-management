import { Dropdown } from 'bootstrap'
import React,{useEffect, useState} from 'react'
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap'
import { addEmployeeAPI, getEmpDetailsAPI, removeEmpAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

const Employeelist = () => {

  const [allEmployees,setAllEmployees] = useState([])
  const [empDetails,setEmpDetails] = useState({empId:"",empName:"",empEmail:"",empStatus:""})
  console.log(empDetails);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    getAllEmployees()
  },[])
  
  const handleUpload = async()=>{
    const {empId,empName,empEmail,empStatus} = empDetails
    if(empId && empName && empEmail && empStatus){
      try{
        const result = await addEmployeeAPI(empDetails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          alert("Details added successfully!!!")
          handleClose()
          
        }else{
          console.log(result);
          
        }
      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("Please fill the form")
    }
  }
  const getAllEmployees = async()=>{
    try{
      const result = await getEmpDetailsAPI()
      console.log(result);
      if(result.status >= 200 && result.status < 300){
        setAllEmployees(result.data)
      }else{
        console.log(result);
        
      }
    }catch(err){
      console.log(err);
      
    }
  }
  const deleteEmp = async(id)=>{
    try{
      await removeEmpAPI(id)
      getAllEmployees()
    }
    catch(err){
      console.log(err);
      
    }
  }

    return (
        <>
            <div style={{ height: '100vh', width:'100%' }} className="bg-dark text-light p-3">
                <h2 className="text-center mt-2 ">Employee Management App</h2>
            
                    <div className='mt-5 align-items-center justify-content-center '>
                        <table className='table table-form'>
                            <thead className='table container'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  allEmployees?.length>0 &&
                                  allEmployees?.map(emp=>(
                                    <tr key={emp.id}>
                                    <td>{emp.empId}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empEmail}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Status
                                            </button>
                                            <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Active</a></li>
                                            <li><a className="dropdown-item" href="#">Inactive </a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={'/edit'}><button className='btn btn-success'>Edit</button></Link>
                                        <button onClick={()=>deleteEmp(emp.id)} className='btn btn-danger ms-2'>Remove</button>
                                    </td>
                                </tr>
                                  ))

                                }
                            </tbody>
                        </table>
                        <button onClick={handleShow} className='btn btn-primary '>Add New Employee</button>
                    </div>   
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static"keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId='floatingId' label='Employee id'>
              <Form.Control onChange={e=>setEmpDetails({...empDetails,empId:e.target.value})} type='text'placeholder='Employee id'/>
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId='floatingName' label='Employee Name'>
              <Form.Control onChange={e=>setEmpDetails({...empDetails,empName:e.target.value})} type='text'placeholder='Employee Name'/>
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId='floatingmail' label='Employee Email'>
              <Form.Control onChange={e=>setEmpDetails({...empDetails,empEmail:e.target.value})}  type='text'placeholder='Employee Email'/>
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId='floatingStatus' label='Employee Status'>
              <Form.Control onChange={e=>setEmpDetails({...empDetails,empStatus:e.target.value})}  type='text'placeholder='Employee Status'/>
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Employeelist