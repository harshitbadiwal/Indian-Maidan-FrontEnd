// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import styles from "../../Pages/Home.module.scss"
// import { useNavigate } from 'react-router-dom';
// export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);
// const navigate = useNavigate()
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const StartPage=()=>{
//     navigate("/start")
//   }
//   return (
//     <React.Fragment>
//       <button className={styles.heroButton}  onClick={handleClickOpen}>
//       Get Started
//       </button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
       
//         aria-describedby="alert-dialog-description"
//       >
       
//         <DialogContent  style={{background:"black",color:"white",display:"flex",padding:"3vw",border:"2px solid rgb(175, 227, 255)",borderRadius:"10px"}}>
//         <div className={styles.turfData}>
//           <div>
//             <img src='/images/stadium.png'/>
//           </div>
//           <p>Book Truf</p>
//           </div>
//           <div className={styles.turfData}>
//           <div>
//             <img src='/images/sportsAcademy.png'/>
//           </div>
//           <p>Find Academy</p>
//           </div>
//         </DialogContent>
        
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import styles from "../../Pages/Home.module.scss"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const StartPage=()=>{
    navigate("/start")
  }
  return (
    <React.Fragment>
        <button className={styles.heroButton}  onClick={handleClickOpen}>
       Get Started
       </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent  style={{background:"#1d1d1df5",color:"white",display:"flex",padding:"3vw",border:"2px solid rgb(175, 227, 255)",borderRadius:"10px"}}>
         <div onClick={()=>StartPage()} className={styles.turfData}>
           <div >
             <img src='/images/stadium.png'/>
           </div>
           <p>Book Truf</p>
           </div>
           <div onClick={()=>StartPage()} className={styles.turfData}>
           <div>
             <img src='/images/sportsAcademy.png'/>
           </div>
           <p>Find Academy</p>
           </div>
         </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}