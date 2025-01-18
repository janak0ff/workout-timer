import { memo } from "react";

// A reusable React component that toggles the sound state.
// It receives two props: allowSound (a boolean) and setAllowSound (a function).
function ToggleSounds({ allowSound, setAllowSound }) {
  // The function will return a button element with an onClick event handler.
  return (
    <button
      // Assign the class name "btn-sound" to the button element.
      className="btn-sound"
      // When the button is clicked, the setAllowSound function will be called.
      // The function takes the current value of allowSound and toggles it.
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {/* // If allowSound is true, display the "🔈" symbol, otherwise display "🔇". */}
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

// Memoize the component to prevent unnecessary re-renders.
export default memo(ToggleSounds);
