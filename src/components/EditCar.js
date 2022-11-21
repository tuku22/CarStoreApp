import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data);
    setCar({
        brand: props.data.brand,
        model: props.data.model,
        color: props.data.color,
        fuel: props.data.fuel,
        year: props.data.year,
        price: props.data.price,
    
    }
    )
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCar(car, props.data._links.car.href);
    setOpen(false);
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            value={car.brand}
            onChange={e => setCar({...car, brand: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Model"
            value={car.model}
            onChange={e => setCar({...car, model: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Color"
            value={car.color}
            onChange={e => setCar({...car, color: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Fuel"
            value={car.fuel}
            onChange={e => setCar({...car, fuel: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Year"
            value={car.year}
            onChange={e => setCar({...car, year: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Price"
            value={car.price}
            onChange={e => setCar({...car, price: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
