import * as React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  MenuItem
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export default function ApplicationsForm() {
  const [formData, setFormData] = React.useState({
    rrpc_date: null,
    letter_date: null,
    reference_no: "",
    coordinating_officer_name: "",
    coordinating_officer_position: "",
    coordinating_officer_email: "",
    coordinating_officer_whatsapp: "",
    coordinating_officer_telno: "",
    all_approved_carder: 0,
    all_existing_carder: 0,
    all_vacancies: 0,
    all_vacancies_from_3years: 0,
    all_vacancies_dueto_retirement: 0,
    rejected_reason: "",
    attached_file: "",
    action_taken: "",
    status: "",
    notes: "",
  });

  const rejectedOptions = [
    "Incomplete data",
    "Invalid document",
    "Late submission",
    "Other"
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attached_file: e.target.files[0] });
  };

  const handleFormSubmit = () => {
    console.log("Form Submitted:", formData);
    alert("Application form saved!");
  };

  // ---------- CARDER TABLE STATE ----------
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const serviceOptions = ["Service A", "Service B", "Service C"];
  const levelOptions = ["Level 1", "Level 2", "Level 3"];

  const handleAddRow = () => {
    const id = Date.now();
    setRows((prev) => [
      ...prev,
      {
        id,
        position: "",
        service: "",
        level: "",
        salary_code: "",
        approved_carder: 0,
        existing_carder: 0,
        vacancies: 0,
        vacancies_from_3years: 0,
        vacancies_dueto_retirement: 0,
        essential_position: 0,
        remark: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "position" },
    }));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "position", headerName: "Position", width: 150, editable: true },
    {
      field: "service",
      headerName: "Service",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: serviceOptions
    },
    {
      field: "level",
      headerName: "Level",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: levelOptions
    },
    { field: "salary_code", headerName: "Salary Code", width: 130, editable: true },
    { field: "approved_carder", headerName: "Approved", width: 110, editable: true, type:"number" },
    { field: "existing_carder", headerName: "Existing", width: 110, editable: true, type:"number" },
    { field: "vacancies", headerName: "Vacancies", width: 110, editable: true, type:"number" },
    { field: "vacancies_from_3years", headerName: "Vac. 3 Years", width: 130, editable: true, type:"number" },
    { field: "vacancies_dueto_retirement", headerName: "Vac. Retirement", width: 150, editable: true, type:"number" },
    { field: "essential_position", headerName: "Essential", width: 110, editable: true, type:"number" },
    { field: "remark", headerName: "Remark", width: 180 , editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  const handleSaveTable = () => {
    console.log("Carder Details Saved:", rows);
    alert("Carder details saved!");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginLeft: "40px", marginRight: "40px" }}>
        {/* Application Form */}
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Application Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="RRPC Date"
                value={formData.rrpc_date}
                onChange={(value) => handleDateChange("rrpc_date", value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Letter Date"
                value={formData.letter_date}
                onChange={(value) => handleDateChange("letter_date", value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>

            {Object.keys(formData).map((field) => {
              if (["rrpc_date", "letter_date"].includes(field)) return null;
              if (["coordinating_officer_whatsapp", "coordinating_officer_telno"].includes(field)) {
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.replace(/_/g, " ")}
                      name={field}
                      type="tel"
                      value={formData[field]}
                      onChange={handleFormChange}
                    />
                  </Grid>
                );
              }
              if (["all_approved_carder","all_existing_carder","all_vacancies","all_vacancies_from_3years","all_vacancies_dueto_retirement"].includes(field)) {
                return (
                  <Grid item xs={12} sm={4} key={field}>
                    <TextField
                      fullWidth
                      label={field.replace(/_/g, " ")}
                      name={field}
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={formData[field]}
                      onChange={handleFormChange}
                    />
                  </Grid>
                );
              }
              if(field === "rejected_reason"){
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      select
                      fullWidth
                      label="Rejected Reason"
                      name={field}
                      value={formData[field]}
                      onChange={handleFormChange}
                    >
                      {rejectedOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )
              }
              if(field === "attached_file"){
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ width: "100%" }}
                    >
                      Upload File
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                  </Grid>
                )
              }
              return (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/_/g, " ")}
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            variant="contained"
            sx={{ marginTop: 2 , backgroundColor:"rgba(197, 96, 2, 1)", color: "white"}}
            onClick={handleFormSubmit}
          >
            Save Application
          </Button>
        </Paper>

        {/* Carder Table */}
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Application Carder Details
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            sx={{ marginBottom: 1 }}
          >
            Add Row
          </Button>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              processRowUpdate={processRowUpdate}
              onRowModesModelChange={setRowModesModel}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 , backgroundColor:"rgba(197, 96, 2, 1)", color: "white"}}
            onClick={handleSaveTable}
          >
            Save Carder Details
          </Button>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
