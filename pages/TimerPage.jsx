import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, Grid, Box, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    if (!isActive && time === 0) {
      const minutes = parseInt(inputMinutes) || 0;
      const seconds = parseInt(inputSeconds) || 0;
      setTime(minutes * 60 + seconds);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
    setInputMinutes('');
    setInputSeconds('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) < 60)) {
      setter(value);
    }
  };

  return (
    <Box className="page" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Exercise Timer</Typography>
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h3" component="div" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {formatTime(time)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Minutes"
                variant="outlined"
                type="number"
                value={inputMinutes}
                onChange={handleInputChange(setInputMinutes)}
                disabled={isActive || time > 0}
                inputProps={{ min: 0, max: 59 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Seconds"
                variant="outlined"
                type="number"
                value={inputSeconds}
                onChange={handleInputChange(setInputSeconds)}
                disabled={isActive || time > 0}
                inputProps={{ min: 0, max: 59 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={toggleTimer} 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
                disabled={!inputMinutes && !inputSeconds && time === 0}
              >
                {isActive ? 'Pause' : (time > 0 ? 'Resume' : 'Start')}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={resetTimer} 
                variant="outlined" 
                color="secondary" 
                fullWidth
                startIcon={<RestartAltIcon />}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TimerPage;