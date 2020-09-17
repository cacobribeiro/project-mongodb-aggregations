db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { voos: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$voos"] },
          },
        },
      ],
      as: "plans",
    },
  },
  {
    $unwind: "$plans",
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 1,
      totalRotas: 1,
    },
  },
]);
