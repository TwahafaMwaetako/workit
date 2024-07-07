import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, Grid, Box, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
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
    if (!isActive && time === 0 && inputTime) {
      setTime(parseInt(inputTime) * 60);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
    setInputTime('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Set timer (minutes)"
                variant="outlined"
                type="number"
                value={inputTime}
                onChange={handleInputChange}
                disabled={isActive || time > 0}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                onClick={toggleTimer} 
                variant="contained" 
                color="primary" 
                fullWidth
                startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
                disabled={!inputTime && time === 0}
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