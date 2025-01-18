import { memo, useCallback, useEffect, useState } from "react"; // Import React hooks and memo function to optimize rendering
import clickSound from "./ClickSound.m4a"; // Import a sound file for audio feedback

// Calculator component to calculate workout duration and handle user inputs
function Calculator({ workouts, allowSound }) {
  // State hooks to manage workout details and user preferences
  const [number, setNumber] = useState(workouts.at(0).numExercises); // Number of exercises in the selected workout
  const [sets, setSets] = useState(3); // Default number of workout sets
  const [speed, setSpeed] = useState(90); // Speed of exercises in seconds per exercise
  const [durationBreak, setDurationBreak] = useState(5); // Duration of break between sets in minutes
  const [duration, setDuration] = useState(0); // Total workout duration calculated based on inputs

  // useEffect to calculate total workout duration whenever inputs change
  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]); // Dependencies for re-calculating duration

  // useEffect to play a sound when interaction occurs, controlled by allowSound
  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return; // Exit if sound is not allowed

      const sound = new Audio(clickSound); // Create a new Audio object with the imported sound file
      sound.play(); // Play the sound
    };
    playSound(); // Call the playSound function whenever allowSound or duration changes
  }, [allowSound, duration]);

  // useEffect to update the document title and log duration and sets
  useEffect(() => {
    console.log(duration, sets); // Log current duration and number of sets to console
    document.title = `Your ${number}-exercise workout`; // Update the browser tab title
  }, [duration, sets, number]); // Dependencies for updating title and logging

  // Calculate minutes and seconds from the total workout duration
  const mins = Math.floor(duration); // Get the whole number of minutes
  const seconds = (duration - mins) * 60; // Calculate remaining seconds

  // Handler to increase duration by one minute
  function handleInc() {
    setDuration((duration) => Math.ceil(duration) + 1);
  }

  // Handler to decrease duration by one minute, ensuring it doesn't go below 0
  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator); // Export the Calculator component as a memoized component to prevent unnecessary re-renders
