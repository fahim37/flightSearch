import {
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Radio,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import bg from "./assets/bg.webp";
import LocationField from "./components/LocationField";
import FlightIcon from "@mui/icons-material/Flight";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { airportData } from "./airportData";

const FlightSearchForm = () => {
  const [seatDetails, setSeatDetails] = useState({
    adult: 1,
    child: 0,
    infant: 0,
    seatClass: "economy",
  });

  // State to handle both single and multi-city selections
  const [locations, setLocations] = useState([{ from: "DAC", to: "CXB" }]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSeatDetails((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue !== 2) {
      // Reset to single pair if not on multi-city
      setLocations([{ from: "DAC", to: "CXB" }]);
    }
  };

  const handleLocationChange = (index, key, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index][key] = value;
    setLocations(updatedLocations);
  };

  const addCity = () => {
    setLocations([...locations, { from: "", to: "" }]);
  };

  const removeCity = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "500px",
        borderRadius: "10px",
        margin: "10px auto",
        width: {
          lg: "85%",
          md: "90%",
          sm: "96%",
          xs: "98%",
        },
        p: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          flexFlow: "wrap",
          mt: "5%",
        }}
      >
        {/* left search box */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            height: "fit-content",
            p: "20px",
            borderRadius: "10px",
            flexBasis: "70.8333%",
            maxWidth: "70.8333%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="none"
              disableRipple
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                },
                "& .MuiTab-root": {
                  minWidth: "auto",
                  padding: "10px 20px",
                  "& .MuiRadio-root": {
                    padding: 0,
                    marginRight: "8px",
                  },
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      checked={selectedTab === 0}
                      value={0}
                      name="flightType"
                      color="primary"
                    />
                    <Typography noWrap fontSize={"14px"} color={"primary.main"}>
                      ROUND-WAY
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      checked={selectedTab === 1}
                      value={1}
                      name="flightType"
                      color="primary"
                    />
                    <Typography noWrap fontSize={"14px"} color={"primary.main"}>
                      ONE-WAY
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      checked={selectedTab === 2}
                      value={2}
                      name="flightType"
                      color="primary"
                    />
                    <Typography noWrap fontSize={"14px"} color={"primary.main"}>
                      MULTI-CITY
                    </Typography>
                  </Box>
                }
              />
            </Tabs>
          </Box>
          {/* ------------------------ */}
          {(selectedTab === 0 || selectedTab === 1) && (
            <Box>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <LocationField
                    label={"FROM"}
                    airportData={airportData}
                    showDate={true}
                    value={locations[0].from}
                    onChange={(value) => handleLocationChange(0, "from", value)}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={{ position: "relative" }}>
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <FlightIcon
                      sx={{
                        width: "1em",
                        height: "1em",
                        display: { xs: "none", sm: "inline-block" }, // Hide on extra small and small screens
                        fill: "currentcolor",
                        flexShrink: 0,
                        fontSize: "100px",
                        position: "absolute",
                        top: 0,
                        left: "20%",
                        transform: "rotate(90deg)",
                        color: "primary.main",
                        userSelect: "none",
                      }}
                    />
                    {selectedTab === 0 && (
                      <FlightOutlinedIcon
                        sx={{
                          width: "1em",
                          height: "1em",
                          display: { xs: "none", sm: "inline-block" }, // Hide on extra small and small screens
                          flexShrink: 0,
                          fontSize: "100px",
                          position: "absolute",
                          bottom: "20px",
                          right: "25%",
                          transform: "rotate(-90deg)",
                          color: "primary.main",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <LocationField
                    label={"TO"}
                    airportData={airportData}
                    showDate={selectedTab === 0}
                    value={locations[0].to}
                    onChange={(value) => handleLocationChange(0, "to", value)}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {selectedTab === 2 && (
            <Box>
              {locations.map((location, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item md={4}>
                    <LocationField
                      label={"FROM"}
                      airportData={airportData}
                      showDate={false}
                      value={location.from}
                      onChange={(value) =>
                        handleLocationChange(index, "from", value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ position: "relative" }}>
                    <Box sx={{ position: "relative", height: "100%" }}>
                      <FlightIcon
                        sx={{
                          width: "1em",
                          height: "1em",
                          display: {
                            xs: "none",
                            sm: "inline-block",
                          }, // Hide on extra small and small screens
                          fill: "currentcolor",
                          flexShrink: 0,
                          fontSize: "100px",
                          position: "absolute",
                          top: 0,
                          left: "20%",
                          transform: "rotate(90deg)",
                          color: "primary.main",
                          userSelect: "none",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationField
                      label={"TO"}
                      airportData={airportData}
                      showDate={true}
                      value={location.to}
                      onChange={(value) =>
                        handleLocationChange(index, "to", value)
                      }
                    />
                    <IconButton
                      onClick={() => removeCity(index)}
                      sx={{
                        color: "error.main",
                        ml: 1,
                        alignSelf: "center",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}
        </Box>
        {/* right side box */}
        <Box
          sx={{
            borderRadius: "10px",
            flexBasis: "29.1667%",
            maxWidth: "29.1667%",
            bgcolor: "#FFFFFF",
            borderTop: {
              xs: "2px dotted #D7E7F4",
              sm: "2px dotted #D7E7F4",
              md: "none",
            },
            borderLeft: {
              md: "2px dotted #D7E7F4",
              xs: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Spacing along the main axis
              height: "100%", // Ensure the container fills its parent to use space effectively
            }}
          >
            <Box>
              {/* right top */}
              <Box sx={{ display: "flex", gap: "10px", p: "10px" }}>
                <FormControl fullWidth>
                  <Select
                    name="adult"
                    value={seatDetails.adult}
                    onChange={handleChange}
                    sx={{ height: "35px", fontSize: "12px" }}
                  >
                    <MenuItem value={1}>1 ADULT</MenuItem>
                    <MenuItem value={2}>2 ADULT</MenuItem>
                    <MenuItem value={3}>3 ADULT</MenuItem>
                    <MenuItem value={4}>4 ADULT</MenuItem>
                    <MenuItem value={5}>5 ADULT</MenuItem>
                    <MenuItem value={6}>6 ADULT</MenuItem>
                    <MenuItem value={7}>7 ADULT</MenuItem>
                    <MenuItem value={8}>8 ADULT</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    name="child"
                    value={seatDetails.child}
                    onChange={handleChange}
                    sx={{ height: "35px", fontSize: "12px" }}
                  >
                    <MenuItem value={0}>0 CHILD</MenuItem>
                    <MenuItem value={1}>1 CHILD</MenuItem>
                    <MenuItem value={2}>2 CHILD</MenuItem>
                    <MenuItem value={3}>3 CHILD</MenuItem>
                    <MenuItem value={4}>4 CHILD</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    name="infant"
                    value={seatDetails.infant}
                    onChange={handleChange}
                    sx={{ height: "35px", fontSize: "12px" }}
                  >
                    <MenuItem value={0}>0 INFANT</MenuItem>
                    <MenuItem value={1}>1 INFANT</MenuItem>
                    <MenuItem value={2}>2 INFANT</MenuItem>
                    <MenuItem value={3}>3 INFANT</MenuItem>
                    <MenuItem value={4}>4 INFANT</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* seat class */}
              <Box sx={{ p: "10px" }}>
                <FormControl fullWidth>
                  <Select
                    name="seatClass"
                    value={seatDetails.seatClass}
                    onChange={handleChange}
                    sx={{ height: "35px", fontSize: "12px" }}
                  >
                    <MenuItem value={"economy"}>Economy</MenuItem>
                    <MenuItem value={"pre-economy"}>Premium Economy</MenuItem>
                    <MenuItem value={"business"}>Business</MenuItem>
                    <MenuItem value={"pre-business"}>Premium Business</MenuItem>
                    <MenuItem value={"firstclass"}>First Class</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ color: "white", width: "94%", m: "10px" }}
              >
                Search For Flight
              </Button>
              {selectedTab === 2 && (
                <Button
                  variant="contained"
                  sx={{ color: "white", width: "94%", m: "10px" }}
                  onClick={addCity}
                >
                  Add City
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightSearchForm;
