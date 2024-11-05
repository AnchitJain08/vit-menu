export const getCafeData = (restaurantName) => {
  switch(restaurantName) {
    case "Under Belly Cafe":
      return {
        rating: 4.3,
        totalReviews: 1432,
        // ... rest of the data
      };

    case "Mayuri Restaurant":
      return {
        rating: 4.5,
        totalReviews: 2156,
        // ... rest of the data
      };

    case "CRCL Cafe":
      return {
        rating: 4.1,
        totalReviews: 987,
        // ... rest of the data
      };

    default:
      return {
        rating: 0,
        totalReviews: 0,
        distribution: [],
        recentReviews: []
      };
  }
}; 