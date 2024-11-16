import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

// Format the time
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short", // Abbreviated month name (e.g. Jan, Feb, etc.)
    year: "2-digit", // 2-digit year (e.g. 22 for 2022)
    hour: "2-digit", // 2-digit hour (e.g. 01, 12, etc.)
    minute: "2-digit", // 2-digit minute (e.g. 04, 59, etc.)
    second: "2-digit", // 2-digit second (e.g. 03, 47, etc.)
  }).format(date);
}

function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // console.log(time);

  // The last two characters of the time string will be either "AM" or "PM"
  const partOfDay = time.slice(-2);
  // console.log(partOfDay);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
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
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  useEffect(function () {
    // Every 1 second, update the time and format it
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    // When the component is no longer rendered, clean up the interval
    return () => clearInterval(id);
  }, []); // The dependency array is empty, meaning this effect will only run on mount and unmount.

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
