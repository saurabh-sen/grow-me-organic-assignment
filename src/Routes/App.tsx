import Button from "@mui/material/Button";
import "../styles/App.css";
import { Form, useNavigate, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Alert component for snack bar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Main component
function App() {

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // component did mount
  useEffect(() => {
    if(location.state?.msg === "You can't visit this page directly without filling the form"){
      setSnackToggle({
        open: true, msg: location.state?.msg, bg: "error"
      })
      navigate(location.pathname, {})
    }
  }, [])
  
  // State
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [snackToggle, setSnackToggle] = useState<any>({
    open: false,
    msg: "",
    bg: "error"
  });
  const { open, msg, bg } = snackToggle;

  // Handle submit
  const handleSubmit = () => {
    if(!name || !phone || !email){
      return setSnackToggle({
        open: true, msg:"Please fill all the fields", bg: "error"
      })
    }else{
      setSnackToggle({
        open: true, msg:"success", bg:"success"
      });
      // save data to local storage
      localStorage.setItem('name', name);
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);
      // navigate to details page
      navigate("/details");
    }
  };  
  
  return (
    <div className="App">
      <Form className="form" onSubmit={() => handleSubmit()} >
        <TextField
          helperText="Please enter your name"
          id="demo-helper-text-misaligned"
          label="Name"
          onChange={(e) => setName((prev:string) => prev = e.target.value)}
        />
        <TextField
          helperText="Please enter your phone number"
          id="demo-helper-text-misaligned"
          label="Phone"
          onChange={(e) => setPhone((prev:string) => prev = e.target.value)}
        />
        <TextField
          helperText="Please enter your email"
          id="demo-helper-text-misaligned"
          label="Email"
          onChange={(e) => setEmail((prev:string) => prev = e.target.value)}
        />
        <Button onClick={() => handleSubmit()} sx={{ width: 100, margin: 'auto' }} variant="contained" endIcon={<CheckCircleOutlineOutlinedIcon />}>
          Send
        </Button>
      </Form>
      
      {/* Snack bar */}
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setSnackToggle({...snackToggle, open: false})}
        >
        <Alert onClose={() => setSnackToggle({...snackToggle, open: false})} severity={bg} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
