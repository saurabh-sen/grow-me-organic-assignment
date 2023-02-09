import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Main component
const Data = () => {

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [details, setDetails] = useState([]);

  // Fetch data
 async function loadData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setDetails(data);
 }

 // Component did mount
  useEffect(() => {
    if(!localStorage.getItem('name')){
      // navigate to form page
      navigate('/', {state: {msg: "You can't visit this page directly without filling the form"}});
    }else {
      location.state = {};
      loadData();
    }
  }, [])

  // define columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'userId',
      headerName: 'User Id',
      type: 'number',
      width: 90,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Post Title',
      type: 'string',
      width: 150,
      editable: true,
    },
    {
      field: 'body',
      headerName: 'Post Body',
      type: 'string',
      width: 600,
      editable: true,
    }
  ];
  
  // define rows
  const rows = details;

  return (
    <div>
      {/* table */}
      <Box sx={{ height: 600, width: '70%', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>
  )
}

export default Data