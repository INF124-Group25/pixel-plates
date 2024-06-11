// "use client";

// import { useState, useEffect } from "react";

// export default function Counter() {
//   const [count, setCount] = useState(null);

//   useEffect(() => {
//     const savedValue = window.localStorage.getItem("count");
//     setCount(savedValue ? Number(savedValue) : 0);
//   }, []);

//   useEffect(() => {
//     if (typeof count === "number") {
//       window.localStorage.setItem("token", count);
//     }
//   }, [count]);

//   return (
//     <button onClick={() => setCount(count + 1)}>
//       Count: {typeof count === "number" ? count : <span>...</span>}
//     </button>
//   );
// }
