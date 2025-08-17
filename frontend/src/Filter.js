import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
  Pagination
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const FilterComponent = () => {
  // Sample data structure based on your database table
  const filterData = {
    "Ministry": [
      {
        name: "Ministry of Defence",
        options: [
          "Defence Headquarters",
          "Sri Lanka Army",
          "Sri Lanka Navy",
          "Sri Lanka Air Force"
        ]
      },
      {
        name: "Ministry of Education",
        options: [
          "Examination Department",
          "Educational Publications Department"
        ]
      }
    ],
    "Province": [
      {
        name: "Western Province",
        options: [
          "Colombo Municipal Council",
          "Gampaha Regional Secretariat"
        ]
      },
      {
        name: "Central Province",
        options: [
          "Kandy Municipal Council",
          "Nuwara Eliya Regional Secretariat"
        ]
      }
    ],
    "Council": [
      "Colombo Municipal Council",
      "Kandy Municipal Council",
      "Gampaha Regional Secretariat",
      "Nuwara Eliya Regional Secretariat"
    ],
    "Level": [
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5"
    ]
  };

  // State for filters
  const [selectedFilters, setSelectedFilters] = useState({
    ministry: [],
    province: [],
    council: [],
    level: [],
    rrpcDate: null,
  });

  const [expandedFilter, setExpandedFilter] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 40;

  // Handle filter selection
  const handleFilterSelect = (category, item) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category].includes(item)) {
        newFilters[category] = [...newFilters[category], item];
      } else {
        newFilters[category] = newFilters[category].filter(i => i !== item);
      }
      return newFilters;
    });
  };

  // Toggle filter category expansion
  const toggleFilter = (category) => {
    setExpandedFilter(expandedFilter === category ? null : category);
  };

  // Calculate total results (would come from API in real app)
  const calculateResults = () => {
    return 125; // Mock number - in real app this would come from API
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate total pages
  const totalPages = Math.ceil(calculateResults() / itemsPerPage);

  return (
    <Box sx={{ display: "flex", gap: 2, p: 3, mt: 2 }}>
      {/* Filter sidebar */}
      <Paper elevation={3} sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Filters
        </Typography>

        {/* Filter categories */}
        {Object.keys(filterData).map((category) => (
          <Box key={category} sx={{ mb: 1 }}>
            <Button
              fullWidth
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                color: "text.primary",
                backgroundColor: expandedFilter === category ? "action.selected" : "inherit"
              }}
              onClick={() => toggleFilter(category)}
              endIcon={expandedFilter === category ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {category}
            </Button>

            <Collapse in={expandedFilter === category}>
              <Box sx={{ 
                maxHeight: 200, 
                overflowY: "auto", 
                p: 1, 
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1
              }}>
                {filterData[category].map((item, index) => {
                  if (typeof item === "object") {
                    // Nested options (for Ministry and Province)
                    return (
                      <Box key={index}>
                        <Button
                          fullWidth
                          sx={{
                            justifyContent: "space-between",
                            textTransform: "none",
                            color: "text.primary",
                            fontSize: "0.875rem",
                            p: 0.5,
                            mb: 0.5
                          }}
                          onClick={() => toggleFilter(`${category}-${item.name}`)}
                          endIcon={expandedFilter === `${category}-${item.name}` ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        >
                          {item.name}
                        </Button>
                        
                        <Collapse in={expandedFilter === `${category}-${item.name}`}>
                          <Box sx={{ pl: 2 }}>
                            {item.options.map((option, optIndex) => (
                              <FormControlLabel
                                key={optIndex}
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={selectedFilters[category.toLowerCase()].includes(option)}
                                    onChange={() => handleFilterSelect(category.toLowerCase(), option)}
                                  />
                                }
                                label={option}
                                sx={{ ml: 1, display: "block" }}
                              />
                            ))}
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  } else {
                    // Simple options (for Council and Level)
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedFilters[category.toLowerCase()].includes(item)}
                            onChange={() => handleFilterSelect(category.toLowerCase(), item)}
                          />
                        }
                        label={item}
                        sx={{ ml: 1, display: "block" }}
                      />
                    );
                  }
                })}
              </Box>
            </Collapse>
          </Box>
        ))}

        {/* RRPC Date filter */}
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              color: "text.primary"
            }}
            onClick={() => setShowDatePicker(!showDatePicker)}
            endIcon={showDatePicker ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            RRPC Date
          </Button>

          <Collapse in={showDatePicker}>
            <Box sx={{ p: 1 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={selectedFilters.rrpcDate || ""}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, rrpcDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Collapse>
        </Box>

        {/* Active filters */}
        {(selectedFilters.ministry.length > 0 ||
          selectedFilters.province.length > 0 ||
          selectedFilters.council.length > 0 ||
          selectedFilters.level.length > 0 ||
          selectedFilters.rrpcDate) && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Active Filters:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedFilters.ministry.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleFilterSelect("ministry", item)}
                />
              ))}
              {selectedFilters.province.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleFilterSelect("province", item)}
                />
              ))}
              {selectedFilters.council.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleFilterSelect("council", item)}
                />
              ))}
              {selectedFilters.level.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleFilterSelect("level", item)}
                />
              ))}
              {selectedFilters.rrpcDate && (
                <Chip
                  label={`RRPC Date: ${selectedFilters.rrpcDate}`}
                  onDelete={() => setSelectedFilters(prev => ({ ...prev, rrpcDate: null }))}
                />
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Results section */}
      <Box sx={{ flex: 1 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1">
              Showing {calculateResults()} results
            </Typography>
            <Select
              value="newest"
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Results would be displayed here */}
          <Typography variant="body1" sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            Filtered results will appear here
          </Typography>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

// Chip component for active filters
const Chip = ({ label, onDelete }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "action.selected",
      borderRadius: 16,
      px: 1,
      py: 0.25,
      fontSize: "0.75rem"
    }}
  >
    {label}
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        ml: 0.5,
        p: 0.25,
        "&:hover": { backgroundColor: "transparent" }
      }}
    >
      
    </IconButton>
  </Box>
);

export default FilterComponent; 