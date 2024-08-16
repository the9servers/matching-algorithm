
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const multer = require("multer");
const path = require("path");

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert({
      "type": process.env.FIREBASE_TYPE,
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_AUTH_URI,
      "token_uri": process.env.FIREBASE_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET_URL
});

const db = admin.database();
const bucket = admin.storage().bucket();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/signup", upload.single("profileImg"), async (req, res) => {
    const { email, password, displayName } = req.body;
    const profileImg = req.file;

    if (!email || !password || !displayName || !profileImg) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userRecord = await admin.auth().createUser({ email, password, displayName });
        console.log('User registered successfully', userRecord.uid);

        const blob = bucket.file(`profileImages/${userRecord.uid}${path.extname(profileImg.originalname)}`);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: profileImg.mimetype }
        });

        blobStream.on('error', (err) => {
            console.error('Error uploading to Firebase Storage:', err);
            res.status(500).json({ message: "Failed to upload profile image" });
        });

        blobStream.on('finish', async () => {
            const photoURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            await admin.auth().updateUser(userRecord.uid, { photoURL });

            await db.ref(`users/${userRecord.uid}/profilePicture`).set({
                url: photoURL,
                contentType: profileImg.mimetype
            });

            res.status(201).json({ message: "User created successfully" });
        });

        blobStream.end(profileImg.buffer);

    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.put("/update-profile/:uid", async (req, res) => {
    const uid = req.params.uid;
    const { 
        age, 
        gender, 
        height, 
        location, 
        eisScore, 
        ocean, 
        relationshipStatus, 
        interests, 
        supportType, 
        supportAvailability, 
        currentNeed,
        displayName 
    } = req.body;

    try {
        const userSnapshot = await db.ref(`users/${uid}`).once('value');
        const userData = userSnapshot.val();

        if (userData && userData.isDeleted) {
            return res.status(400).json({ message: "Cannot update a deleted user profile" });
        }

        const updates = {};
        if (age !== undefined) updates.age = age;
        if (gender !== undefined) updates.gender = gender;
        if (height !== undefined) updates.height = height;
        if (location !== undefined) updates.location = location;
        if (eisScore !== undefined) updates.eisScore = eisScore;
        if (ocean !== undefined) updates.ocean = ocean;
        if (relationshipStatus !== undefined) updates.relationshipStatus = relationshipStatus;
        if (interests !== undefined) updates.interests = interests;
        if (supportType !== undefined) updates.supportType = supportType;
        if (supportAvailability !== undefined) updates.supportAvailability = supportAvailability;
        if (currentNeed !== undefined) updates.currentNeed = currentNeed;

        await db.ref(`users/${uid}`).update(updates);

        if (displayName) {
            await admin.auth().updateUser(uid, {
                displayName: displayName
            });
        }

        res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.put("/restore-user/:uid", async (req, res) => {
    const uid = req.params.uid;

    try {
        // Update user data in Firebase Realtime Database
        await db.ref(`users/${uid}`).update({
            isDeleted: false,
            deletedAt: null,
            restoredAt: admin.database.ServerValue.TIMESTAMP
        });

        // Re-enable the user in Firebase Auth
        await admin.auth().updateUser(uid, {
            disabled: false
        });

        res.status(200).json({ message: "User restored successfully" });
    } catch (error) {
        console.error('Error restoring user:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get("/user/:uid", async (req, res) => {
    const uid = req.params.uid;

    try {
        // Fetch user data from Firebase Realtime Database
        const userSnapshot = await db.ref(`users/${uid}`).once('value');
        const userData = userSnapshot.val();

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is soft deleted
        if (userData.isDeleted) {
            return res.status(410).json({ message: "User has been deleted" });
        }

        // Fetch additional user info from Firebase Auth
        const userRecord = await admin.auth().getUser(uid);

        // Combine data from Realtime Database and Auth
        const userInfo = {
            uid: uid,
            email: userRecord.email,
            emailVerified: userRecord.emailVerified,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            ...userData
        };

        // Remove sensitive information
        delete userInfo.password;
        delete userInfo.isDeleted;
        delete userInfo.deletedAt;

        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.code === 'auth/user-not-found') {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
});


app.put("/soft-delete-user/:uid", async (req, res) => {
    const uid = req.params.uid;

    try {
        await db.ref(`users/${uid}`).update({
            isDeleted: true,
            deletedAt: admin.database.ServerValue.TIMESTAMP
        });

        await admin.auth().updateUser(uid, {
            disabled: true
        });

        res.status(200).json({ message: "User soft deleted successfully" });
    } catch (error) {
        console.error('Error soft deleting user:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.post("/verifyToken", async(req, res)=> {
    const {idToken} = req.body;

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      const uid = decodedToken.uid
      const userRecord = await admin.auth().getUser(uid)

      res.status(200).json({
        message:"Token verified successfully",
        user:{
            uid: userRecord.uid,
            email:userRecord.email,
            displayName: userRecord.displayName
        }
      })
        
    } catch (error) {
        console.log(error)
    }
});

const matchUsers = async () => {
  try {
    // Get all users from the 'users' node in Realtime Database
    const usersSnapshot = await db.ref('users').once('value');
    const users = usersSnapshot.val();

    if (!users) {
      console.log("No users found");
      return;
    }

    let matches = [];

    // Iterate through users to find potential matches
    Object.keys(users).forEach(userId => {
      const user = users[userId];

      Object.keys(users).forEach(matchId => {
        const match = users[matchId];

        if (userId !== matchId) {
          if (user.currentNeed === 'Seeking Support' && match.currentNeed === 'Offering Support') {
            const score = calculateMatchScore(user, match);
            matches.push({ matchId, score });
          } else if (user.currentNeed === 'Offering Support' && match.currentNeed === 'Seeking Support') {
            const score = calculateMatchScore(user, match);
            matches.push({ matchId, score });
          }
        }
      });
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

//Get matches
app.get('/match', (req, res) => {
  matchUsers();
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
	