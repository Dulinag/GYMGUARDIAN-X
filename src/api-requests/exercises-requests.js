export const getExercises = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/exercises", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const res = await response.json();
      
      return res.data; // You should return the data you fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., display an error message to the user
      throw error; // Rethrow the error to propagate it to the caller
    }
  };