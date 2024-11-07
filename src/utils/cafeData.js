const cafes = {
  "Under Belly Cafe": {
    name: "Under Belly Cafe",
    rating: "4.3",
    totalReviews: 1400,
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Great food and ambiance!",
        date: "2024-01-15"
      },
      // ... more reviews
    ]
  },
  "Mayuri Cafe": {
    name: "Mayuri Cafe",
    rating: "4.2",
    totalReviews: 1200,
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Excellent South Indian food",
        date: "2024-01-15"
      },
      // ... more reviews
    ]
  },
  "CRCL Cafe": {
    name: "CRCL Cafe",
    rating: "4.1",
    totalReviews: 1000,
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Best coffee on campus",
        date: "2024-01-15"
      },
      // ... more reviews
    ]
  }
};

export const getCafeData = (cafeName) => {
  return cafes[cafeName] || {
    rating: "0",
    totalReviews: 0,
    reviews: []
  };
}; 