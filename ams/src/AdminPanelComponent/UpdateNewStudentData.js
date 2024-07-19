import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QueueIcon from "@mui/icons-material/Queue";
import {useNavigate} from 'react-router-dom'
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

const UpdateNewStudentData = () => {
  const [idLen, setIdLen] = useState("");
  const [studentId, setStudentId] = useState(idLen);
  const [studentName, setStudentName] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("2024-07-14");
  // console.log(dob)

  const [trainerName, setTrainerName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchName, setBatchName] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    // for extracting trainer name
    const localStore = () => {
      const auth = localStorage.getItem("user");
      if (auth) {
        setTrainerName(JSON.parse(auth).name);
      }
    };

    // extracting lenth of batches DB for seting Batch id
    const batches = async () => {
      try {
        const batchData = await fetch("http://localhost:5001/batch");
        const data = await batchData.json();
        setBatches(data);
        const length = data.length;
        setBatchId(length + 1);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const student = async () => {
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
    batches();
    student();
  }, );

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // add batch function
  const addBatch = async () => {
    if (!batchId || !trainerName || !batchName) {
      alert("Please enter batch.");
      return;
    }
    const batchData = {
      id: batchId,
      name: trainerName,
      batch: batchName,
    };
    let result = await fetch("http://localhost:5001/batch", {
      method: "POST",
      body: JSON.stringify(batchData),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    alert("Batch added successfully!");
    // navigate('/')
  };

  // add student function
  const addStudent = async () => {
    if (!studentId || !studentName || !studentBatch) {
      alert("Please enter ID, name, and batch.");
      return;
    }

    const newStudent = {
      id: parseInt(studentId),
      name: studentName,
      batch: studentBatch,
    };

    try {
      let result = await fetch("http://localhost:5001/students", {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

      alert("Student added successfully!");

    } catch (error) {
      console.error("There was an error adding the student!", error);
      alert("There was an error adding the student. Please try again.");
    }

    try {
      let userName = studentName.toLowerCase().replace(/ /g, "");
      let next = dob.split("-");
      let final = `${userName}@${next[0]}`;

      const newUser = {
        name: studentName,
        email: email,
        password: final,
        role: "student",
        id: parseInt(studentId),
        batch: studentBatch,
      };
      let result = await fetch("http://localhost:5001/signup", {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      alert("Account created successfully");
      // navigate("/");
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <CssBaseline />
      <Grid
        container
        // spacing={2}
        // direction="column"
        // alignItems="center"
        // component={Box}
        sx={{
          display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "5px 5px 8px #cecece",
          minHeight: "400px",
          overflow: "auto",
        }}
      >
        <Grid item md={6} xs={12} sx={{ paddingRight: { xs: 0, md: "10px" } }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                marginBottom: "15px",
                margin: "auto",
              }}
            >
              <QueueIcon />
            </Avatar>
            <Typography variant="h6" textAlign="center" mt={1}>
              Add New Batch
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Batch Id"
                  name="id"
                  type="number"
                  value={batchId}
                  onChange={(e) => setBatchId(batchId)}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Trainer Name"
                  name="name"
                  type="text"
                  value={trainerName}
                  onChange={(e) => setTrainerName(trainerName)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Batch"
                  name="batch"
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  onClick={addBatch}
                  fullWidth
                  variant="contained"
                >
                  Add Batch
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Add student */}

        <Grid
          item
          md={6}
          xs={12}
          sx={{
            paddingLeft: { xs: 0, md: "10px" },
            marginTop: { xs: "40px", md: 0 },
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                marginBottom: "15px",
                margin: "auto",
              }}
            >
              <PersonAddIcon />
            </Avatar>
            <Typography variant="h6" textAlign="center" mt={1}>
              Add New Student
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="User Id"
                  name="id"
                  type="number"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="DOB"
                  name="dob"
                  type="date"
                  value={dob}
                  // value={studentId}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  label="Batch"
                  name="batch"
                  type="text"
                  value={studentBatch}
                  onChange={(e) => setStudentBatch(e.target.value)}
                /> */}
                <FormControl fullWidth>
                  <InputLabel>Select Batch</InputLabel>
                  <Select
                    label="Select Batch"
                    value={studentBatch}
                    onChange={(e) => setStudentBatch(e.target.value)}
                    required
                  >
                    {batches.map((item) => (
                      <MenuItem value={item.batch}>{item.batch}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  onClick={addStudent}
                  fullWidth
                  variant="contained"
                >
                  Add Student
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateNewStudentData;
