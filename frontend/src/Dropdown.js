import React, { useState } from "react";
import { Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


export default function NestedCategoryMenu() {
  const data = {
    අමාත්‍යංශය: [
      {
        name: "ආරක්ෂක අමාත්‍යාංශය",
        options: [
          "ආරක්ෂක මාණ්ඩලික ප්‍රධානි කාර්යාලය",
          "ශ්‍රී ලංකා යුධ හමුදාව",
          "ශ්‍රී ලංකා නාවික හමුදාව"
        ]
      },
      {
        name: "අධ්‍යාපන අමාත්‍යාංශය",
        options: ["විභාග දෙපාර්තමේන්තුව", "අධ්‍යාපන ප්‍රකාශන දෙපාර්තමේන්තුව"]
      }
    ],
    පළාත්: [
      {
        name: "බස්නාහිර පළාත",
        options: ["මහ නගර සභාව ", "ප්‍රාදේශීය ලේඛම් කාර්යාලය "]
      },
      {
        name: "මධ්‍යම පළාත",
        options: ["මහ නගර සභාව ", "ප්‍රාදේශීය ලේඛම් කාර්යාලය "]
      }
    ],
    "ස්වාධින ආයතන": [
      { name: "ජනාධිපති ලේඛම් කාර්යාලය" },
      { name: "ජාතික විගණන කාර්යාලය" }
    ]
  };

  const [selectedMainGroup, setSelectedMainGroup] = useState(null);
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Open main menu
  const handleMainButtonClick = (event, groupName) => {
    setSelectedMainGroup(groupName);
    setMainAnchorEl(event.currentTarget);
  };

  // Open sub menu
  const handleCategoryClick = (event, category) => {
    if (category.options && category.options.length > 0) {
      setSelectedCategory(category);
      setSubAnchorEl(event.currentTarget);
    } else {
      console.log("Selected category without options:", category.name);
      handleMainClose();
    }
  };

  // Close menus
  const handleMainClose = () => {
    setMainAnchorEl(null);
    setSubAnchorEl(null);
    setSelectedCategory(null);
  };
  const handleSubClose = () => {
    setSubAnchorEl(null);
  };

  return (
    <div >
      {/* Button group for top-level menus + extra buttons */}
      <ButtonGroup
      variant="contained"
      aria-label="main category group"
      sx={{
        width: "100%", // full width of screen
      }}
    >
      {/* Dropdown buttons */}
      {Object.keys(data).map((groupName) => (
        <Button
          key={groupName}
          endIcon={<ArrowDropDownIcon />}
          onClick={(e) => handleMainButtonClick(e, groupName)}
          sx={{
            flex: 1, // equal width for all buttons
            backgroundColor: "rgba(197, 96, 2, 1)",
            color: "white",
            padding: "6px 0", // equal vertical padding
            "&:hover": { backgroundColor: "#e69500" },
            textTransform: "none",
            fontSize: "18px"
          }}
        >
          {groupName}
        </Button>
      ))}

      {/* Extra normal buttons */}
      <Button
        sx={{
          flex: 1,
          backgroundColor:"rgba(197, 96, 2, 1)",
          color: "white",
          padding: "6px 0",
          "&:hover": { backgroundColor: "#e69500" },
          textTransform: "none",
          fontSize: "18px"
        }}
        onClick={() => console.log("Extra Button 1 clicked")}
      >
        කමිටු
      </Button>

      <Button
        sx={{
          flex: 1,
          backgroundColor: "rgba(197, 96, 2, 1)",
          color: "white",
          padding: "6px 0",
          "&:hover": { backgroundColor: "#e69500" },
          textTransform: "none",
          fontSize: "18px"
        }}
        onClick={() => console.log("Extra Button 2 clicked")}
      >
        අමාත්‍ය මණ්ඩල
      </Button>
    </ButtonGroup>

      {/* Main menu */}
      <Menu
        anchorEl={mainAnchorEl}
        open={Boolean(mainAnchorEl)}
        onClose={handleMainClose}
      >
        {data[selectedMainGroup]?.map((cat, idx) => (
          <MenuItem
            key={idx}
            onClick={(event) => handleCategoryClick(event, cat)}
          >
            {cat.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Sub menu */}
      {selectedCategory?.options?.length > 0 && (
        <Menu
          anchorEl={subAnchorEl}
          open={Boolean(subAnchorEl)}
          onClose={handleSubClose}
        >
          {selectedCategory.options.map((opt, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                console.log("Selected:", opt);
                handleSubClose();
                handleMainClose();
              }}
            >
              {opt}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
