db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
