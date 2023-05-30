export const dataMap = [
    {
      stage: "round 1",
      arrayMatch: [
        {
          point: [2, 3],
          isDraw: false,
          participantId: ["62a9b9bff06ad25d4760e383", "62aaace623efef693546322a"],
          backStageId: [],
          backMatch: [],
          _id: "62ac2df4306bf945fae4875b",
          stage: "round 1",
          match: 1,
          isWinParticipantId: "62aaace623efef693546322a"
        },
        {
          point: [2, 3],
          isDraw: false,
          participantId: ["62a9b9e6f06ad25d4760e38f", "62aaace923efef6935463233"],
          backStageId: [],
          backMatch: [],
          _id: "62ac2df4306bf945fae4875c",
          stage: "round 1",
          match: 2,
          isWinParticipantId: "62aaace923efef6935463233"
        }
      ]
    },
    {
      stage: "round 2",
      arrayMatch: [
        {
          point: [],
          isDraw: false,
          participantId: ["62aaa7e0b4484d6893d895fd", "62a9b9faf06ad25d4760e39d"],
          backStageId: [],
          backMatch: [],
          _id: "62ac2df4306bf945fae4875d",
          stage: "round 2",
          match: 3
        },
        {
          point: [],
          isDraw: false,
          participantId: ["62aaace023efef6935463218", "62aaa802b4484d6893d8960b"],
          backStageId: [],
          backMatch: [],
          _id: "62ac2df4306bf945fae4875e",
          stage: "round 2",
          match: 4
        },
        {
          point: [],
          isDraw: false,
          participantId: ["62a9b9fef06ad25d4760e3a6", "62aaace323efef6935463221"],
          backStageId: [],
          backMatch: [],
          _id: "62ac2df4306bf945fae4875f",
          stage: "round 2",
          match: 5
        },
        {
          point: [],
          isDraw: false,
          participantId: ["62aaace623efef693546322a", "62aaace923efef6935463233"],
          backStageId: ["62ac2df4306bf945fae4875b", "62ac2df4306bf945fae4875c"],
          backMatch: [1, 2],
          _id: "62ac2df4306bf945fae48760",
          stage: "round 2",
          match: 6
        }
      ]
    },
    {
      stage: "Semifinals",
      arrayMatch: [
        {
          point: [],
          isDraw: false,
          participantId: [null, null],
          backStageId: ["62ac2df4306bf945fae4875d", "62ac2df4306bf945fae4875e"],
          backMatch: [3, 4],
          _id: "62ac2df4306bf945fae48761",
          stage: "round 3",
          match: 7
        },
        {
          point: [],
          isDraw: false,
          participantId: [null, null],
          backStageId: ["62ac2df4306bf945fae4875f", "62ac2df4306bf945fae48760"],
          backMatch: [5, 6],
          _id: "62ac2df4306bf945fae48762",
          stage: "round 3",
          match: 8
        }
      ]
    },
    {
      stage: "Finals",
      arrayMatch: [
        {
          point: [],
          isDraw: false,
          participantId: [null, null],
          backStageId: ["62ac2df4306bf945fae48761", "62ac2df4306bf945fae48762"],
          backMatch: [7, 8],
          _id: "62ac2df4306bf945fae48763",
          stage: "round 4",
          match: 9
        }
      ]
    }
  ];
  