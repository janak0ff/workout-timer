import { useEffect, useMemo, useState } from "react"; // Import React hooks for managing state and side effects
import Calculator from "./Calculator"; // Import the Calculator component
import ToggleSounds from "./ToggleSounds"; // Import the ToggleSounds component

// Function to format the current date and time
function formatTime(date) {
  // Use Intl.DateTimeFormat to format the date object into a specific string format
  return new Intl.DateTimeFormat("en", {
    month: "short", // Abbreviated month name (e.g., Jan, Feb)
    year: "2-digit", // Two-digit year (e.g., 22 for 2022)
    hour: "2-digit", // Two-digit hour (e.g., 01, 12)
    minute: "2-digit", // Two-digit minute (e.g., 04, 59)
    second: "2-digit", // Two-digit second (e.g., 03, 47)
  }).format(date);
}

// Main App component
function App() {
  // State to manage whether sound is allowed
  const [allowSound, setAllowSound] = useState(true);
  // State to store the current formatted time
  const [time, setTime] = useState(formatTime(new Date()));

  // Determine the part of the day (AM or PM) from the formatted time string
  // console.log(time);

  // The last two characters of the time string will be either "AM" or "PM"
  const partOfDay = time.slice(-2);
  // console.log(partOfDay);

  // useMemo hook to memoize the workouts array based on the part of the day
  const workouts = useMemo(() => {
    // Return an array of workout objects, with the number of exercises depending on AM or PM
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8, // More exercises in the morning
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4, // More exercises in the morning
      },
    ];
  }, [partOfDay]); // Dependencies for useMemo; re-evaluate if partOfDay changes

  // useEffect hook to update the time every second
  useEffect(function () {
    // Set an interval to update the time state every 1000ms (1 second)
    const id = setInterval(function () {
      setTime(formatTime(new Date())); // Update time with the current date formatted
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(id);
  }, []); // Empty dependency array, runs only on mount and unmount

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>{" "}
      {/* Display the current time in the UI */}
      <ToggleSounds
        allowSound={allowSound}
        setAllowSound={setAllowSound}
      />{" "}
      {/* Component to toggle sound */}
      <Calculator workouts={workouts} allowSound={allowSound} />{" "}
      {/* Calculator component for workouts */}
    </main>
  );
}

export default App; // Export the App component as the default export
