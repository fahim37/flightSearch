import React, { useState, useRef } from "react";
import { Typography, Box, ClickAwayListener } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

const LocationField = ({
  label,
  airportData,
  showDate,
  onChange,
  value,
  placeholder,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(value);
  const inputRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSelect = (option) => {
    setSelectedOption(option.code);
    onChange?.(option.code);
    setOpenDropdown(false);
  };

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickAway = () => {
    setOpenDropdown(false);
  };

  const filteredOptions = airportData.filter((option) =>
    option.airportName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAirportName = selectedOption
    ? airportData.find((item) => item.code === selectedOption)?.airportName ||
      ""
    : placeholder || "Select an airport...";

  // Function to focus the date input field
  const focusDateInput = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {/* fromto and code */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontSize={"13px"}>
            {label}
          </Typography>
          <Typography
            variant="h3"
            fontSize={"40px"}
            fontWeight={400}
            color={"primary.main"}
          >
            {value}
          </Typography>
        </Box>
        {/* location searchbox */}
        <Box
          ref={inputRef}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#D7E7F4",
            borderRadius: 1,
            height: "35px",
            cursor: "pointer",
            mt: "15px",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
          onClick={handleToggleDropdown}
        >
          <Box
            sx={{
              width: "15%",
              height: "100%",
              backgroundColor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 1,
              cursor: "pointer", // Ensure the cursor indicates clickable
            }}
          >
            <LocationOnOutlinedIcon sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="body1"
            noWrap
            sx={{ fontSize: "13px", pl: 1, width: "90%" }}
          >
            {`${selectedAirportName}(${value})`}
          </Typography>
        </Box>
        {showDate && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              height: "34px",
            }}
          >
            <Box
              sx={{
                width: "15%",
                height: "100%",
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 1,
                cursor: "pointer", // Ensure the cursor indicates clickable
              }}
              onMouseDown={focusDateInput} // Change to onMouseDown to ensure the input is focused
            >
              <DateRangeOutlinedIcon sx={{ color: "white" }} />
            </Box>
            <Box
              component="input"
              type="date"
              defaultValue="2024-08-20"
              ref={dateInputRef} // Attach the ref to the date input field
              sx={{
                width: "100%",
                padding: "8px",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                outline: "none",
                bgcolor: "#D7E7F4",
                cursor: "pointer", // Ensure the cursor indicates clickable
              }}
              onMouseDown={focusDateInput} // Optional: Add onMouseDown if needed
            />
          </Box>
        )}
      </Box>
      {openDropdown && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              position: "absolute",
              top: "70%",
              left: 0,
              width: "100%",
              maxHeight: 250,
              overflowY: "auto",
              backgroundColor: "primary.main",
              boxShadow: 3,
              zIndex: 10,
              mt: 1,
              borderRadius: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              color: "white",
            }}
          >
            <Box sx={{ padding: 2 }}>
              <Box
                component="input"
                placeholder="Search airports..."
                onChange={handleSearchChange}
                value={searchTerm}
                sx={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  outline: "none",
                }}
              />
            </Box>
            <Box>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Box
                    key={option.code}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "10px",
                      cursor: "pointer",

                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                    onClick={() => handleSearchSelect(option)}
                  >
                    <Box sx={{ fontSize: "1px" }}>
                      <Typography
                        variant="body1"
                        color="white"
                        fontSize={"12px"}
                      >
                        {option.location}
                      </Typography>
                      <Typography variant="body2" fontSize={"11px"}>
                        {option.airportName}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.main" sx={{}}>
                      {option.code}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    No results found
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default LocationField;
