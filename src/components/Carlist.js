import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import EditCar from './EditCar'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCar from './AddCar'

export default function Carlist() {
  const [cars, setCars] = useState([]);

  const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width: 120},
    {field: 'price', sortable: true, filter: true, width: 150},
    {
      width: 150,
      cellRenderer: params => <EditCar data={params.data} updateCar={updateCar}/>

    },
    {
      width: 150,
      cellRenderer: params => 
        <Button color="error" size="small" onClick={() => deleteCar(params.data)}>
          Delete
        </Button>
    }
  ])

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    fetch('http://carrestapi.herokuapp.com/cars')
    .then(response => {
      if (response.ok)
        return response.json();
      else
        alert('Something went wrong');
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error)
  }

  const deleteCar = (data) => {
    if (window.confirm('Are you sure?')) {
      fetch(data._links.car.href, {method: 'DELETE'})
      .then(response => {
        if (response.ok)
          getCars();
        else 
          alert('Something went wrong in deletion');
      })
      .catch(err => console.error(err))
    }
  }

  const addCar = (car) => {
    fetch ('http://carrestapi.herokuapp.com/cars', {
      method: "POST",
      headers: { "Content-type" : "application/json"},
      body: JSON.stringify(car),
    })
    .then(response => {
      if (response.ok) 
        getCars()
      else
        alert('Something went wrong')
    })

  }

  const updateCar = (car, url) => {
    fetch(url, {
      method: 'PUT',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(car)
    })
    .then(response=> {
      if (response.ok)
        getCars();
      else
        alert('Something went wrong');
    })
    .catch(err => console.error(err))
  }

  return(
    <div className='ag-theme-material' style={{height: 650, width: '90%', margin:'auto'}}>
      <AddCar addCar = {addCar}/>
      <AgGridReact 
        rowData={cars}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
