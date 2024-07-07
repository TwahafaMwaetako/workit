import React, { useState } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';

const WorkoutPage = ({ workouts, setWorkouts }) => {
  const [name, setName] = useState('');
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !exercise || !sets || !reps || !weight) return;
    
    setWorkouts(prevWorkouts => [...prevWorkouts, {
      id: Date.now(),
      name,
      exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
      date: new Date().toISOString(),
    }]);

    setName('');
    setExercise('');
    setSets('');
    setReps('');
    setWeight('');
  };

  return (
    <div className="page">
      <Typography variant="h5" gutterBottom>Add Workout</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Workout Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
        <TextField fullWidth label="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} className="input-field" required />
        <TextField fullWidth label="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} className="input-field" required />
        <TextField fullWidth label="Reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="input-field" required />
        <TextField fullWidth label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-field" required />
        <Button type="submit" variant="contained" color="primary" className="button">
          Add Workout
        </Button>
      </form>
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Recent Workouts</Typography>
      <Paper className="card">
        <List>
          {workouts.slice(-5).reverse().map((workout) => (
            <ListItem key={workout.id} divider>
              <ListItemText
                primary={workout.name}
                secondary={`${workout.exercise} - ${workout.sets} sets, ${workout.reps} reps, ${workout.weight} kg`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default WorkoutPage;