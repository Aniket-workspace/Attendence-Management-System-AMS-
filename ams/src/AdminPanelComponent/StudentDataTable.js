import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";

// npm install react-to-print

// import { useReactToPrint } from "react-to-print"; // To save table data in pdf form

const StudentDataTable = () => {
  //Shivanjali made this changes
  const componentPDF = useRef();

  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const batches = async () => {
      try {
        const batchData = await fetch("http://localhost:5001/batch");
        const data = await batchData.json();
        setBatches(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    batches();
    fetchStudents();
  },[]);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const deleteStudent = async (id) => {
    try {
      let result = await fetch(`http://localhost:5001/delete-student/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        alert("Student Deleted");
      }
    } catch (error) {
      console.error(error);
    }

    try {
      let result = await fetch(`http://localhost:5001/delete-user/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        alert("Account Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = selectedBatch
    ? students.filter((student) => student.batch === selectedBatch)
    : students;

  // Shivanjali Made this

  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "StudentDataTable",
  //   onAfterPrint: () => alert("Data saved in PDF"),
  // });

  return (
    <Container component={"main"} maxWidth="lg">
      <div ref={componentPDF}>
        <CssBaseline />
        <Grid
          mt={3}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "5px 5px 8px #cecece",
            maxHeight: "450px",
            overflowY: "scroll",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}
          ></Avatar>
          <Typography variant="h6" textAlign={"center"}>
            All Student Data
          </Typography>

          <Box component="div" sx={{ mt: 3, display: "flex" }}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} xs={12}>
                <Typography variant="div">Select Batch</Typography>
                <FormControl fullWidth>
                  <Select value={selectedBatch} onChange={handleBatchChange}>
                    <MenuItem value="" selected>
                      All Batches
                    </MenuItem>
                    {batches.map((item) => (
                      <MenuItem value={item.batch}>{item.batch}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12} lg={12} xs={12}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <b>ID</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Batch</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell align="center">{student.id}</TableCell>
                        <TableCell align="center">{student.name}</TableCell>
                        <TableCell align="center">{student.batch}</TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={()=>deleteStudent(student.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
    </Container>
  );
};

export default StudentDataTable;
