import { useState } from "react";
import { Button, Select, MenuItem, FormControl, TextField, Typography, Box, Switch, FormControlLabel, Slider } from "@mui/material";
import "./App.css";

export default function ModeSelection() {
  const [selectedMode, setSelectedMode] = useState("");
  const [frequency, setFrequency] = useState({ min: "", max: "" });
  const [vocalization, setVocalization] = useState(false);
  const [problemCount, setProblemCount] = useState(10);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <Box className="panel wide-panel">
      <Box className="mode-buttons">
        {/* Theme Selection */}
        <Box className="mode-option">
          <Button
            className={`mode-button ${selectedMode === "theme" ? "active" : ""}`}
            onClick={() => handleModeSelection("theme")}
          >
            Theme
          </Button>
          <FormControl className="dropdown-container">
            <Select displayEmpty disabled={selectedMode !== "theme"}>
              <MenuItem value="" disabled>Select a Theme</MenuItem>
              <MenuItem value="body-parts">Body Parts</MenuItem>
              <MenuItem value="ritual-religion">Ritual and Religion</MenuItem>
              <MenuItem value="government-law">Government and Law</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Part of Speech Selection */}
        <Box className="mode-option">
          <Button
            className={`mode-button ${selectedMode === "pos" ? "active" : ""}`}
            onClick={() => handleModeSelection("pos")}
          >
            Part of Speech
          </Button>
          <FormControl className="dropdown-container">
            <Select displayEmpty disabled={selectedMode !== "pos"}>
              <MenuItem value="" disabled>Select Part of Speech</MenuItem>
              <MenuItem value="pronouns">Pronouns</MenuItem>
              <MenuItem value="nouns">Nouns</MenuItem>
              <MenuItem value="adjectives">Adjectives</MenuItem>
              <MenuItem value="verbs">Verbs</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Frequency Selection */}
        <Box className="mode-option">
          <Button
            className={`mode-button ${selectedMode === "frequency" ? "active" : ""}`}
            onClick={() => handleModeSelection("frequency")}
          >
            Frequency
          </Button>
          <Box className="input-container">
            {/* Min Frequency */}
            <Box>
              <TextField
                type="number"
                value={frequency.min}
                onChange={(e) => setFrequency({ ...frequency, min: e.target.value })}
                fullWidth
                className="fixed-width-input"
                style={{
                  height: "56px",
                  paddingTop: "10px",
                  width: "220px",
                }}
                disabled={selectedMode !== "frequency" && selectedMode !== "pos"}
              />
              <Typography className="input-label">Min Frequency</Typography>
            </Box>

            {/* Max Frequency */}
            <Box>
              <TextField
                type="number"
                value={frequency.max}
                onChange={(e) => setFrequency({ ...frequency, max: e.target.value })}
                fullWidth
                className="fixed-width-input"
                style={{
                  height: "56px",
                  paddingTop: "10px",
                  width: "220px",
                }}
                disabled={selectedMode !== "frequency" && selectedMode !== "pos"}
              />
              <Typography className="input-label">Max Frequency</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Vocalization Mode Toggle */}
      <Box className="vocalization-toggle">
        <Typography>Vocalization Mode:</Typography>
        <FormControlLabel
          control={<Switch checked={vocalization} onChange={() => setVocalization(!vocalization)} />}
          label={vocalization ? "Vocalize" : "Unvocalize"}
        />
      </Box>

      {/* Slider Feature */}
      <Box className="slider-container">
        <Typography className="slider-question">How many problems would you like to do?</Typography>
        <Slider
          value={problemCount}
          onChange={(e, newValue) => setProblemCount(newValue)}
          min={1}
          max={20}
          step={1}
          className="problem-slider"
          valueLabelDisplay="on" // Ensures the number stays visible inside the circle
          sx={{
            color: "#c29464", // Adjust color to match your theme
            "& .MuiSlider-thumb": {
              width: 40,
              height: 40,
              backgroundColor: "#c29464",
              "&:before": {
                boxShadow: "none"
              }
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "transparent", // Remove default background
              color: "white", // Text color
              fontSize: "16px",
              fontWeight: "bold",
              width: "40px", // Match thumb size
              height: "40px",
              top: "50%", // Align to the center
              left: "50%",
              transform: "translate(-50%, -50%) !important", // Center the number
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }}
        />
        <Typography className="slider-warning"><i>If the slider value exceeds the maximum possible number of unique prompts, the slider will be automatically readjusted.</i></Typography>
      </Box>

      {/* Start Button */}
      <Box className="start-button-container">
        <Button variant="contained" className="start-button">Start</Button>
      </Box>
    </Box>
  );
}