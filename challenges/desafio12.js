db.trips.aggregate([
  {
    $match: {
      $expr: {
        $eq: [5, { $dayOfWeek: "$startTime" }],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: +1 },
    },
  },
  {
    $sort: {
      total: -1,
      _id: 1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  {
    $limit: 1,
  },
]);
