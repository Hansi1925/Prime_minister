import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ApplicationContext } from "./ApplicationContext";
import { Paper, Typography } from "@mui/material";

function CommitteeSubmitted() {
  const { formData, carderRows } = useContext(ApplicationContext);

  if (carderRows.length === 0) {
    return <Typography variant="body1">⚠️ Please fill Accordion 1 first.</Typography>;
  }

  const columns = [
    { field: "position", headerName: "Position", width: 150 },
    { field: "approved_carder", headerName: "Approved", width: 120 },
    { field: "existing_carder", headerName: "Existing", width: 120 },
    { field: "vacancies", headerName: "Vacancies", width: 120 },
    { field: "vacancies_from_3years", headerName: "Vac. 3 Years", width: 130 },
    { field: "essential_position", headerName: "Essential", width: 120 },
    {
      field: "committee_submitted_quantity",
      headerName: "Committee Submitted Qty",
      width: 200,
      editable: true,
    },
  ];

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Committee Submitted Reports
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Total Approved: {formData.all_approved_carder} | 
        Existing: {formData.all_existing_carder} | 
        Vacancies: {formData.all_vacancies}
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={carderRows.map((row) => ({ ...row, id: row.id }))}
          columns={columns}
          disableRowSelectionOnClick
          editMode="cell"
        />
      </div>
    </Paper>
  );
}

export default CommitteeSubmitted;