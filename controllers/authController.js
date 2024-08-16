const users = [
  {
    userid: "user001",
    profilePhoto: "https://example.com/photos/user001.jpg",
    age: 28,
    gender: "Male",
    location: "New York",
    eisScore: 85,
    ocean: {
      openness: 78,
      conscientiousness: 88,
      extraversion: 70,
      agreeableness: 82,
      neuroticism: 60
    },
    relationshipStatus: "Single",
    interests: ["hiking", "movies", "coding"],
    supportType: {
      preferred: ["Empathy", "Reassurance"],
      offered: ["Simulation", "Physical Touch"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "18:00-21:00"
    },
    currentNeed: "Seeking Support"
  },

  {
    userid: "user002",
    profilePhoto: "https://example.com/photos/user002.jpg",
    age: 25,
    gender: "Female",
    location: "Los Angeles",
    eisScore: 78,
    ocean: {
      openness: 85,
      conscientiousness: 75,
      extraversion: 65,
      agreeableness: 90,
      neuroticism: 55
    },
    relationshipStatus: "Single",
    interests: ["reading", "yoga", "traveling"],
    supportType: {
      preferred: ["Reassurance", "Empathy"],
      offered: ["Reassurance", "Repeat back"]
    },
    supportAvailability: {
      alwaysAvailable: true,
      selectedTime: ""
    },
    currentNeed: "Offering Support"
  },

  {
    userid: "user003",
    profilePhoto: "https://example.com/photos/user003.jpg",
    age: 32,
    gender: "Male",
    location: "Chicago",
    eisScore: 92,
    ocean: {
      openness: 80,
      conscientiousness: 82,
      extraversion: 76,
      agreeableness: 88,
      neuroticism: 62
    },
    relationshipStatus: "Married",
    interests: ["photography", "cooking", "fitness"],
    supportType: {
      preferred: ["Empathy", "Simulation"],
      offered: ["Reassurance", "Empathy"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "07:00-10:00"
    },
    currentNeed: "Seeking Support"
  },

  {
    userid: "user004",
    profilePhoto: "https://example.com/photos/user004.jpg",
    age: 29,
    gender: "Female",
    location: "Houston",
    eisScore: 88,
    ocean: {
      openness: 72,
      conscientiousness: 85,
      extraversion: 80,
      agreeableness: 70,
      neuroticism: 75
    },
    relationshipStatus: "Single",
    interests: ["painting", "music", "gardening"],
    supportType: {
      preferred: ["Physical Touch", "Reassurance"],
      offered: ["Empathy", "Physical Touch"]
    },
    supportAvailability: {
      alwaysAvailable: true,
      selectedTime: ""
    },
    currentNeed: "Offering Support"
  },

  {
    userid: "user005",
    profilePhoto: "https://example.com/photos/user005.jpg",
    age: 35,
    gender: "Male",
    location: "New York",
    eisScore: 81,
    ocean: {
      openness: 75,
      conscientiousness: 78,
      extraversion: 60,
      agreeableness: 85,
      neuroticism: 58
    },
    relationshipStatus: "Married",
    interests: ["gaming", "writing", "technology"],
    supportType: {
      preferred: ["Simulation", "Empathy"],
      offered: ["Reassurance", "Simulation"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "19:00-22:00"
    },
    currentNeed: "Seeking Support"
  },

  {
    userid: "user006",
    profilePhoto: "https://example.com/photos/user006.jpg",
    age: 27,
    gender: "Female",
    location: "San Francisco",
    eisScore: 83,
    ocean: {
      openness: 80,
      conscientiousness: 72,
      extraversion: 78,
      agreeableness: 85,
      neuroticism: 65
    },
    relationshipStatus: "Single",
    interests: ["cycling", "technology", "art"],
    supportType: {
      preferred: ["Reassurance", "Empathy"],
      offered: ["Simulation", "Reassurance"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "20:00-23:00"
    },
    currentNeed: "Seeking Support"
  },

  {
    userid: "user007",
    profilePhoto: "https://example.com/photos/user007.jpg",
    age: 31,
    gender: "Male",
    location: "Boston",
    eisScore: 76,
    ocean: {
      openness: 70,
      conscientiousness: 88,
      extraversion: 60,
      agreeableness: 75,
      neuroticism: 50
    },
    relationshipStatus: "Single",
    interests: ["running", "cooking", "traveling"],
    supportType: {
      preferred: ["Physical Touch", "Reassurance"],
      offered: ["Empathy", "Reassurance"]
    },
    supportAvailability: {
      alwaysAvailable: true,
      selectedTime: ""
    },
    currentNeed: "Offering Support"
  },

  {
    userid: "user008",
    profilePhoto: "https://example.com/photos/user008.jpg",
    age: 29,
    gender: "Female",
    location: "Seattle",
    eisScore: 91,
    ocean: {
      openness: 85,
      conscientiousness: 80,
      extraversion: 65,
      agreeableness: 90,
      neuroticism: 55
    },
    relationshipStatus: "Married",
    interests: ["photography", "writing", "yoga"],
    supportType: {
      preferred: ["Empathy", "Reassurance"],
      offered: ["Simulation", "Empathy"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "08:00-10:00"
    },
    currentNeed: "Seeking Support"
  },

  {
    userid: "user009",
    profilePhoto: "https://example.com/photos/user009.jpg",
    age: 34,
    gender: "Male",
    location: "Miami",
    eisScore: 88,
    ocean: {
      openness: 75,
      conscientiousness: 82,
      extraversion: 70,
      agreeableness: 85,
      neuroticism: 60
    },
    relationshipStatus: "Married",
    interests: ["fishing", "music", "technology"],
    supportType: {
      preferred: ["Simulation", "Empathy"],
      offered: ["Reassurance", "Physical Touch"]
    },
    supportAvailability: {
      alwaysAvailable: false,
      selectedTime: "17:00-20:00"
    },
    currentNeed: "Offering Support"
  },

  {
    userid: "user010",
    profilePhoto: "https://example.com/photos/user010.jpg",
    age: 30,
    gender: "Female",
    location: "Austin",
    eisScore: 79,
    ocean: {
      openness: 88,
      conscientiousness: 75,
      extraversion: 72,
      agreeableness: 80,
      neuroticism: 68
    },
    relationshipStatus: "Single",
    interests: ["reading", "gaming", "gardening"],
    supportType: {
      preferred: ["Empathy", "Simulation"],
      offered: ["Reassurance", "Empathy"]
    },
    supportAvailability: {
      alwaysAvailable: true,
      selectedTime: ""
    },
    currentNeed: "Seeking Support"
  }
];

const matchUsers = () => {
  const user = users[0];

  try {
    const potentialMatchesSnapshot = users;
    let matches = [];

    potentialMatchesSnapshot.forEach(match => {
      if (match.userid !== user.userid && user.currentNeed === 'Seeking Support' && match.currentNeed === 'Offering Support') {
        const score = calculateMatchScore(user, match);
        matches.push({ matchId: match.userid, score });
      } 
      else if (match.userid !== user.userid && user.currentNeed === 'Offering Support' && match.currentNeed === 'Seeking Support') {
        const score = calculateMatchScore(user, match);
        matches.push({ matchId: match.userid, score });
      }
    });

    // Sort matches by score in descending order and get the top 5
    matches.sort((a, b) => b.score - a.score);
    const topMatches = matches.slice(0, 5);
    console.log("Top matches: ", topMatches);
  } 
  catch (error) {
    console.error('Error matching users:', error);
  }
};

// calculateMatchScore function
const calculateMatchScore = (user, match) => {
  let score = 0;

  // Age Match (10 points)
  const ageDifference = Math.abs(user.age - match.age);
  score += (ageDifference <= 5) ? 10 : (ageDifference <= 10) ? 5 : 0;

  // Location Match (20 points)
  score += (user.location === match.location) ? 20 : 0;

  // EIS Score Match (15 points)
  const eisDifference = Math.abs(user.eisScore - match.eisScore);
  score += (eisDifference <= 10) ? 15 : (eisDifference <= 20) ? 10 : 0;

  // OCEAN Personality Match (20 points)
  score += calculateOceanScore(user, match);

  // Relationship Status Match (5 points)
  score += (user.relationshipStatus === match.relationshipStatus) ? 5 : 0;

  // Shared Interests (10 points)
  const sharedInterests = user.interests.filter(interest => match.interests.includes(interest));
  score += sharedInterests.length * 2;

  // Support Type Match (10 points)
  score += calculateSupportTypeScore(user.supportType.preferred, match.supportType.offered);

  // Support Availability Match (10 points)
  if (user.supportAvailability.alwaysAvailable || match.supportAvailability.alwaysAvailable) {
    score += 10;
  } else if (user.supportAvailability.selectedTime === match.supportAvailability.selectedTime) {
    score += 5;
  }

  return score;
};

const calculateOceanScore = (user, match) => {
  let score = 0;

  // Comparing individual OCEAN traits
  score += (Math.abs(user.ocean.openness - match.ocean.openness) <= 10) ? 5 : 0;
  score += (Math.abs(user.ocean.conscientiousness - match.ocean.conscientiousness) <= 10) ? 5 : 0;
  score += (Math.abs(user.ocean.extraversion - match.ocean.extraversion) <= 10) ? 5 : 0;
  score += (Math.abs(user.ocean.agreeableness - match.ocean.agreeableness) <= 10) ? 5 : 0;
  score += (Math.abs(user.ocean.neuroticism - match.ocean.neuroticism) <= 10) ? 5 : 0;

  return score;
};

const calculateSupportTypeScore = (userSupportType, matchSupportType) => {
  // Assign points based on overlapping support types
  const matchingSupportTypes = userSupportType.filter(type => matchSupportType.includes(type));
  return matchingSupportTypes.length * 2;
};

module.exports.finalMatch = (req, res) => {
  matchUsers();

  res.send("Match successful");
}

//Registration endpoint
module.exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const db = admin.firestore();
    const usersRef = db.collection('users');
    
    await usersRef.doc(userData.userid).set(userData);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
}

//login endpoint
module.exports.login = async (req, res) => {
  
}

//profile update
module.exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const matches = await findMatches(userId, limit);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find matches' });
  }
}

//get matches
module.exports.getMatches = async () => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const matches = await findMatches(userId, limit);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find matches' });
  }
}