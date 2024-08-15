// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import QueueIcon from "@mui/icons-material/Queue";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";

// const UpdateBatchStudentData = () => {
//   const [idLen, setIdLen] = useState("");
//   const [studentId, setStudentId] = useState(idLen);
//   const [studentName, setStudentName] = useState("");
//   const [studentBatch, setStudentBatch] = useState("");
//   const [batches, setBatches] = useState([]);
//   const [email, setEmail] = useState("");
//   const [dob, setDOB] = useState("2024-07-14");
//   const [trainerName, setTrainerName] = useState("");
//   const [batchId, setBatchId] = useState("");
//   const [batchName, setBatchName] = useState("");
//   const [editStudentId, setEditStudentId] = useState("");
//   const [editStudentName, setEditStudentName] = useState("");
//   const [editStudentEmail, setEditStudentEmail] = useState("");
//   const [editStudentDOB, setEditStudentDOB] = useState("");
//   const [editStudentBatch, setEditStudentBatch] = useState("");

//   const [editBatchId, setEditBatchId] = useState("");
// const [editTrainerName, setEditTrainerName] = useState("");
// const [editBatchName, setEditBatchName] = useState("");


//   const navigate = useNavigate();

//   useEffect(() => {
//     const localStore = () => {
//       const auth = localStorage.getItem("user");
//       if (auth) {
//         setTrainerName(JSON.parse(auth).name);
//       }
//     };

//     const fetchBatches = async () => {
//       try {
//         const batchData = await fetch("http://localhost:5001/batch");
//         const data = await batchData.json();
//         setBatches(data);
//         const length = data.length;
//         setBatchId(length + 1);
//       } catch (error) {
//         console.error("Error fetching batches:", error);
//       }
//     };

//     const fetchStudents = async () => {
//       try {
//         const studentData = await fetch("http://localhost:5001/students");
//         const data = await studentData.json();
//         const length = data.length;
//         setStudentId(length + 1);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     localStore();
//     fetchBatches();
//     fetchStudents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

//   const addBatch = async () => {
//     if (!batchId || !trainerName || !batchName) {
//       alert("Please enter batch.");
//       return;
//     }
//     const batchData = {
//       id: batchId,
//       name: trainerName,
//       batch: batchName,
//     };
//     let result = await fetch("http://localhost:5001/batch", {
//       method: "POST",
//       body: JSON.stringify(batchData),
//       headers: { "Content-Type": "application/json" },
//     });
//     result = await result.json();
//     console.log(result);
//     alert("Batch added successfully!");
//   };

//   const addStudent = async () => {
//     if (!studentId || !studentName || !studentBatch) {
//       alert("Please enter ID, name, and batch.");
//       return;
//     }

//     const newStudent = {
//       id: parseInt(studentId),
//       name: studentName,
//       batch: studentBatch,
//     };

//     try {
//       let result = await fetch("http://localhost:5001/students", {
//         method: "POST",
//         body: JSON.stringify(newStudent),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       result = await result.json();
//       console.log(result);
//       alert("Student added successfully!");
//     } catch (error) {
//       console.error("There was an error adding the student!", error);
//       alert("There was an error adding the student. Please try again.");
//     }

//     try {
//       let userName = studentName.toLowerCase().replace(/ /g, "");
//       let next = dob.split("-");
//       let final = `${userName}@${next[0]}`;

//       const newUser = {
//         name: studentName,
//         email: email,
//         password: final,
//         role: "student",
//         id: parseInt(studentId),
//         batch: studentBatch,
//       };
//       let result = await fetch("http://localhost:5001/signup", {
//         method: "post",
//         body: JSON.stringify(newUser),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       result = await result.json();
//       console.log(result);
//       alert("Account created successfully");
//     } catch (error) {
//       console.error("Error registering user", error);
//       alert("Error registering user");
//     }
//   };

//   const updateBatch = async () => {
//     if (!editBatchId || !editTrainerName || !editBatchName) {
//       alert("Please fill in all fields.");
//       return;
//     }
  
//     const updatedBatch = {
//       name: editTrainerName,
//       batch: editBatchName,
//     };
  
//     try {
//       let result = await fetch(`http://localhost:5001/update-batch/${editBatchId}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedBatch),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       result = await result.json();
//       console.log(result);
//       alert("Batch updated successfully!");
//       // Update the batches state to reflect the changes in the dropdown
//       setBatches(batches.map(batch => 
//         batch.id === editBatchId ? { ...batch, name: editTrainerName, batch: editBatchName } : batch
//       ));
//     } catch (error) {
//       console.error("There was an error updating the batch!", error);
//       alert("There was an error updating the batch. Please try again.");
//     }
//   };
  

//   const updateStudent = async () => {
//     if (!editStudentId || !editStudentName || !editStudentEmail || !editStudentDOB || !editStudentBatch) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const updatedStudent = {
//       name: editStudentName,
//       email: editStudentEmail,
//       dob: editStudentDOB,
//       batch: editStudentBatch,
//     };

//     try {
//       let result = await fetch(`http://localhost:5001/update-student/${editStudentId}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedStudent),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       result = await result.json();
//       console.log(result);
//       alert("Student updated successfully!");
//     } catch (error) {
//       console.error("There was an error updating the student!", error);
//       alert("There was an error updating the student. Please try again.");
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 3 }}>
//       <CssBaseline />
//       <Grid
//         container
//         sx={{
//           display: "flex",
//           backgroundColor: "white",
//           padding: "25px",
//           borderRadius: "15px",
//           boxShadow: "5px 5px 8px #cecece",
//           minHeight: "400px",
//           overflow: "auto",
//         }}
//       >
//         {/* <Grid item md={4} xs={12} sx={{ paddingRight: { xs: 0, md: "10px" } }}>
//           <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
//             <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
//               <QueueIcon />
//             </Avatar>
//             <Typography variant="h6" textAlign="center" mt={1}>
//               Add New Batch
//             </Typography>
//           </Box>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Batch Id"
//                   name="id"
//                   type="number"
//                   value={batchId}
//                   onChange={(e) => setBatchId(batchId)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Trainer Name"
//                   name="name"
//                   type="text"
//                   value={trainerName}
//                   onChange={(e) => setTrainerName(trainerName)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Batch"
//                   name="batch"
//                   type="text"
//                   value={batchName}
//                   onChange={(e) => setBatchName(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" onClick={addBatch} fullWidth variant="contained">
//                   Add Batch
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid> */}

//         {/* <Grid item md={4} xs={12} sx={{ paddingLeft: { xs: 0, md: "10px" }, marginTop: { xs: "40px", md: 0 } }}>
//           <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
//             <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
//               <PersonAddIcon />
//             </Avatar>
//             <Typography variant="h6" textAlign="center" mt={1}>
//               Add New Student
//             </Typography>
//           </Box>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Student Id"
//                   name="id"
//                   type="number"
//                   value={studentId}
//                   onChange={(e) => setStudentId(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   name="name"
//                   type="text"
//                   value={studentName}
//                   onChange={(e) => setStudentName(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="DOB"
//                   name="dob"
//                   type="date"
//                   value={dob}
//                   onChange={(e) => setDOB(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Batch</InputLabel>
//                   <Select
//                     label="Select Batch"
//                     value={studentBatch}
//                     onChange={(e) => setStudentBatch(e.target.value)}
//                     required
//                   >
//                     {batches.map((item) => (
//                       <MenuItem key={item.batch} value={item.batch}>
//                         {item.batch}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" onClick={addStudent} fullWidth variant="contained">
//                   Add Student
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid> */}


// <Grid item md={4} xs={12} sx={{ paddingLeft: { xs: 0, md: "10px" }, marginTop: { xs: "40px", md: 0 } }}>
//   <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
//     <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
//       <FaEdit />
//     </Avatar>
//     <Typography variant="h6" textAlign="center" mt={1}>
//       Update Batch
//     </Typography>
//   </Box>
//   <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <FormControl fullWidth>
//           <InputLabel>Select Batch</InputLabel>
//           <Select
//             label="Select Batch"
//             value={editBatchId}
//             onChange={(e) => {
//               const selectedBatch = batches.find(batch => batch.id === e.target.value);
//               setEditBatchId(selectedBatch.id);
//               setEditTrainerName(selectedBatch.name);
//               setEditBatchName(selectedBatch.batch);
//             }}
//             required
//           >
//             {batches.map((item) => (
//               <MenuItem key={item.id} value={item.id}>
//                 {item.batch}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           required
//           fullWidth
//           label="Trainer Name"
//           name="trainerName"
//           type="text"
//           value={editTrainerName}
//           onChange={(e) => setEditTrainerName(e.target.value)}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           required
//           fullWidth
//           label="Batch Name"
//           name="batchName"
//           type="text"
//           value={editBatchName}
//           onChange={(e) => setEditBatchName(e.target.value)}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button type="submit" onClick={updateBatch} fullWidth variant="contained">
//           Update Batch
//         </Button>
//       </Grid>
//     </Grid>
//   </Box>
// </Grid>

        

//         <Grid item md={4} xs={12} sx={{ paddingLeft: { xs: 0, md: "10px" }, marginTop: { xs: "40px", md: 0 } }}>
//           <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
//             <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
//               {/* <QueueIcon /> */}
//               <FaEdit />
//             </Avatar>
//             <Typography variant="h6" textAlign="center" mt={1}>
//              Update Student
//             </Typography>
//           </Box>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Student Id"
//                   name="id"
//                   type="number"
//                   value={editStudentId}
//                   onChange={(e) => setEditStudentId(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Name"
//                   name="name"
//                   type="text"
//                   value={editStudentName}
//                   onChange={(e) => setEditStudentName(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={editStudentEmail}
//                   onChange={(e) => setEditStudentEmail(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="DOB"
//                   name="dob"
//                   type="date"
//                   value={editStudentDOB}
//                   onChange={(e) => setEditStudentDOB(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Batch</InputLabel>
//                   <Select
//                     label="Select Batch"
//                     value={editStudentBatch}
//                     onChange={(e) => setEditStudentBatch(e.target.value)}
//                     required
//                   >
//                     {batches.map((item) => (
//                       <MenuItem key={item.batch} value={item.batch}>
//                         {item.batch}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" onClick={updateStudent} fullWidth variant="contained">
//                   Update Student
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default UpdateBatchStudentData;


import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueueIcon from "@mui/icons-material/Queue";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const UpdateBatchStudentData = () => {
  const [idLen, setIdLen] = useState("");
  const [studentId, setStudentId] = useState(idLen);
  const [studentName, setStudentName] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("2024-07-14");
  const [trainerName, setTrainerName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchName, setBatchName] = useState("");
  const [editStudentId, setEditStudentId] = useState("");
  const [editStudentName, setEditStudentName] = useState("");
  const [editStudentEmail, setEditStudentEmail] = useState("");
  const [editStudentDOB, setEditStudentDOB] = useState("");
  const [editStudentBatch, setEditStudentBatch] = useState("");

  const [editBatchId, setEditBatchId] = useState("");
  const [editTrainerName, setEditTrainerName] = useState("");
  const [editBatchName, setEditBatchName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const localStore = () => {
      const auth = localStorage.getItem("user");
      if (auth) {
        setTrainerName(JSON.parse(auth).name);
      }
    };

    const fetchBatches = async () => {
      try {
        const batchData = await fetch("http://localhost:5001/batch");
        const data = await batchData.json();
        setBatches(data);
        const length = data.length;
        setBatchId(length + 1);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const studentData = await fetch("http://localhost:5001/students");
        const data = await studentData.json();
        const length = data.length;
        setStudentId(length + 1);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    localStore();
    fetchBatches();
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const updateBatch = async () => {
    if (!editBatchId || !editTrainerName || !editBatchName) {
      alert("Please fill in all fields.");
      return;
    }
  
    const updatedBatch = {
      name: editTrainerName,
      batch: editBatchName,
    };
  
    try {
      let result = await fetch(`http://localhost:5001/update-batch/${editBatchId}`, {
        method: "PUT",
        body: JSON.stringify(updatedBatch),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      alert("Batch updated successfully!");
      // Update the batches state to reflect the changes in the dropdown
      setBatches(batches.map(batch => 
        batch.id === editBatchId ? { ...batch, name: editTrainerName, batch: editBatchName } : batch
      ));
    } catch (error) {
      console.error("There was an error updating the batch!", error);
      alert("There was an error updating the batch. Please try again.");
    }
  };

  const updateStudent = async () => {
    if (!editStudentId || !editStudentName || !editStudentEmail || !editStudentDOB || !editStudentBatch) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedStudent = {
      name: editStudentName,
      email: editStudentEmail,
      dob: editStudentDOB,
      batch: editStudentBatch,
    };

    try {
      let result = await fetch(`http://localhost:5001/update-student/${editStudentId}`, {
        method: "PUT",
        body: JSON.stringify(updatedStudent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      alert("Student updated successfully!");
    } catch (error) {
      console.error("There was an error updating the student!", error);
      alert("There was an error updating the student. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <CssBaseline />
      <Grid
        container
        sx={{
          display: "flex",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "5px 5px 8px #cecece",
          minHeight: "400px",
          overflow: "auto",
        }}
      >
        {/* Update Batch Section */}
        <Grid item md={6} xs={12} sx={{ paddingRight: { xs: 0, md: "10px" } }}>
          <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
            <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
              <FaEdit />
            </Avatar>
            <Typography variant="h6" textAlign="center" mt={1}>
              Update Batch
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Batch</InputLabel>
                  <Select
                    label="Select Batch"
                    value={editBatchId}
                    onChange={(e) => {
                      const selectedBatch = batches.find(batch => batch.id === e.target.value);
                      setEditBatchId(selectedBatch.id);
                      setEditTrainerName(selectedBatch.name);
                      setEditBatchName(selectedBatch.batch);
                    }}
                    required
                  >
                    {batches.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.batch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Trainer Name"
                  name="trainerName"
                  type="text"
                  value={editTrainerName}
                  onChange={(e) => setEditTrainerName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Batch Name"
                  name="batchName"
                  type="text"
                  value={editBatchName}
                  onChange={(e) => setEditBatchName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" onClick={updateBatch} fullWidth variant="contained">
                  Update Batch
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Update Student Section */}
        <Grid item md={6} xs={12} sx={{ paddingLeft: { xs: 0, md: "10px" }, marginTop: { xs: "40px", md: 0 } }}>
          <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
            <Avatar sx={{ bgcolor: "primary.main", marginBottom: "15px", margin: "auto" }}>
              <FaEdit />
            </Avatar>
            <Typography variant="h6" textAlign="center" mt={1}>
              Update Student
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Student Id"
                  name="id"
                  type="number"
                  value={editStudentId}
                  onChange={(e) => setEditStudentId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Student Name"
                  name="name"
                  type="text"
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Student Email"
                  name="email"
                  type="email"
                  value={editStudentEmail}
                  onChange={(e) => setEditStudentEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Student DOB"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={editStudentDOB}
                  onChange={(e) => setEditStudentDOB(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Batch</InputLabel>
                  <Select
                    label="Select Batch"
                    value={editStudentBatch}
                    onChange={(e) => setEditStudentBatch(e.target.value)}
                    required
                  >
                    {batches.map((item) => (
                      <MenuItem key={item.id} value={item.batch}>
                        {item.batch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" onClick={updateStudent} fullWidth variant="contained">
                  Update Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateBatchStudentData;


