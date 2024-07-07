import React, { useState, useMemo } from 'react';
import { Typography, Paper, Box, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ProgressPage = ({ workouts }) => {
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const processedData = useMemo(() => {
    return workouts.reduce((acc, workout) => {
      const existingWorkout = acc.find(w => w.name === workout.name);
      if (existingWorkout) {
        existingWorkout.data.push({
          date: new Date(workout.date).toLocaleDateString(),
          weight: workout.weight,
          reps: workout.reps,
          sets: workout.sets
        });
      } else {
        acc.push({
          name: workout.name,
          data: [{
            date: new Date(workout.date).toLocaleDateString(),
            weight: workout.weight,
            reps: workout.reps,
            sets: workout.sets
          }]
        });
      }
      return acc;
    }, []);
  }, [workouts]);

  const calculateProgress = (data) => {
    if (data.length < 2) return { value: 0, percentage: 0 };
    const firstValue = data[0][selectedMetric];
    const lastValue = data[data.length - 1][selectedMetric];
    const difference = lastValue - firstValue;
    const percentage = ((difference / firstValue) * 100).toFixed(2);
    return { value: difference, percentage };
  };

  const getOverallProgress = () => {
    let totalPercentage = 0;
    let count = 0;
    processedData.forEach(workout => {
      const progress = calculateProgress(workout.data);
      if (progress.percentage !== 0) {
        totalPercentage += parseFloat(progress.percentage);
        count++;
      }
    });
    return count > 0 ? (totalPercentage / count).toFixed(2) : 0;
  };

  const overallProgress = getOverallProgress();

  return (
    <Box className="page" sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Progress Tracker</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Overall Progress</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" color={overallProgress > 0 ? "success.main" : "error.main"}>
                {overallProgress}%
              </Typography>
              {overallProgress > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Metric</InputLabel>
              <Select
                value={selectedMetric}
                label="Metric"
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <MenuItem value="weight">Weight</MenuItem>
                <MenuItem value="reps">Reps</MenuItem>
                <MenuItem value="sets">Sets</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {processedData.map((workout) => {
          const progress = calculateProgress(workout.data);
          return (
            <Grid item xs={12} md={6} key={workout.name}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>{workout.name}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body1">
                    Progress: {progress.value} ({progress.percentage}%)
                  </Typography>
                  {progress.percentage > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
                </Box>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={workout.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Workout Comparison</Typography>
        <Box height={400}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData.map(w => ({ name: w.name, value: w.data[w.data.length - 1][selectedMetric] }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name={selectedMetric} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProgressPage;