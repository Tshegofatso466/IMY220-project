import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("frontend/public"));

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectToDatabase();

const db = client.db("IMY_project");
const collection = db.collection("IMY-playlists");


app.post("/imy/login", async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await collection.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ id: user._id.toString(), message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/imy/signup", async (req, res) => {
    const { username, email, password, profileImage, bio } = req.body;

    // Create the user object
    const newUser = {
        username,
        email,
        password, // In a real application, make sure to hash the password
        profileImage: profileImage || null, // Optional, can be null
        bio: bio || null, // Optional, can be null
        followers: 0, // Default value
        following: 0, // Default value
        playlists: [], // Empty array
        friends: [], // Empty array
        pictures: [] // Empty array
    };

    try {
        const result = await collection.insertOne(newUser); // Change "users" to your collection name
        res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
});

app.get("/imy/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) }); // Convert string id to ObjectId

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/imy/playlists/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user || !Array.isArray(user.playlists)) {
            return res.status(404).json({ message: "No playlists for the current user." });
        }

        const allPlaylists = [];

        for (const playlist of user.playlists) {
            console.log(playlist.reference, playlist.OwnerId);
            if (playlist.reference && playlist.OwnerId) {
                const owner = await collection.findOne({ _id: new ObjectId(playlist.OwnerId) });
                // console.log("in here: " + owner);
                if (owner) {
                    // console.log(owner);
                    const refPlayListData = owner.playlists.find(pl => pl.id.toString() === playlist.id.toString());
                    // console.log(refPlayListData);

                    if (refPlayListData) {
                        // Add the referenced playlist's data to allPlaylists
                        allPlaylists.push({
                            PlayListName: refPlayListData.PlayListName,
                            PlayListImage: refPlayListData.PlayListImage,
                            OwnerImage: owner.profileImage || refPlayListData.OwnerImage, // Owner's profile image
                            OwnerName: owner.username || refPlayListData.OwnerName,     // Owner's name
                            songs: refPlayListData.songs,
                            comments: refPlayListData.comments,
                            numberOfSongs: Array.isArray(refPlayListData.songs) ? refPlayListData.songs.length : 0,
                            id: refPlayListData.id.toString(),
                            profileId: playlist.OwnerId.toString(),
                            referencedFrom: owner.username, // Add info about where the reference comes from (owner's username)
                            genre: refPlayListData.genre,
                            hashtags: refPlayListData.hashtags
                        });
                    }
                }
            } else {
                allPlaylists.push({
                    PlayListName: playlist.PlayListName,
                    PlayListImage: playlist.PlayListImage,
                    OwnerImage: user.profileImage,
                    OwnerName: user.username,
                    songs: playlist.songs,
                    comments: playlist.comments,
                    numberOfSongs: Array.isArray(playlist.songs) ? playlist.songs.length : 0,
                    id: playlist.id.toString(),
                    profileId: userId,
                    genre: playlist.genre,
                    hashtags: playlist.hashtags
                });
            }
        }

        res.status(200).json(allPlaylists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/imy/search', async (req, res) => {
    const searchTerm = req.query.q; // Get the search term from query params
    try {
        const regex = new RegExp(searchTerm, 'i'); // 'i' makes the search case-insensitive
        const results = await collection.find({
            $or: [
                { "playlists.PlayListName": regex }, // Search in playlist names
                { "username": regex },               // Search in usernames
                { "playlists.songs.title": regex }   // Search in song titles
            ]
        }).toArray();

        if (results.length === 0) {
            return res.status(404).json({ message: "No results found" });
        }

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/imy/playlist/:id", async (req, res) => {
    const playlistId = req.params.id;
    // console.log(`Received request for playlist ID: ${playlistId}`);
    try {
        // Use the 'id' field from the playlists array
        const data = await collection.findOne(
            {
                playlists: {
                    $elemMatch: { id: new ObjectId(playlistId), reference: false }
                }
            }, // Change to 'playlists.id'
            { projection: { "playlists.$": 1, "_id": 1, "followers": 1, "username": 1, "profileImage": 1 } }
        );

        if (!data || !data.playlists.length) {
            // console.log("Playlist not found");
            return res.status(404).json({ message: "Playlist not found" });
        }

        const newObj = {
            playlist: data.playlists[0],
            profileId: data._id,
            followers: data.followers
        }

        newObj.playlist.OwnerImage = data.profileImage;
        newObj.playlist.OwnerName = data.username;


        res.status(200).json(newObj); // Return the found playlist and owner
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/imy/createPlaylist", async (req, res) => {
    const { playlistName, OwnerImage, PlaylistImage, OwnerName, userId } = req.body;

    // Validate the incoming data
    if (!playlistName || !OwnerImage || !PlaylistImage || !OwnerName || !userId) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new playlist object
    const newPlaylist = {
        PlayListName: playlistName,
        PlayListImage: PlaylistImage, // Assuming you want to use the OwnerImage as the playlist image
        OwnerImage: OwnerImage,
        OwnerName: OwnerName,
        songs: [], // Initialize with empty songs array
        comments: [], // Initialize with empty comments array
        id: new ObjectId(), // Generate a new ObjectId for the playlist
    };

    try {
        // Update the user's document by pushing the new playlist into the playlists array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) }, // Find the user by ObjectId
            { $push: { playlists: newPlaylist } } // Push the new playlist into the playlists array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "could not insert playlist." });
        }

        res.status(201).json({ message: "Playlist created successfully", playlistId: newPlaylist.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the playlist." });
    }
});

app.post("/imy/createSong", async (req, res) => {
    const { song, userId, playlistId } = req.body;

    // Validate the incoming data
    if (!userId || !song.title || !song.artists || !Array.isArray(song.artists) || song.artists.length === 0 || !song.spotifyURL || !song.image || !playlistId) {
        return res.status(400).json({ error: "All fields are required, and artists must be an array." });
    }

    // Create a new song object
    const newSong = {
        title: song.title,
        artists: song.artists,
        sportifyURL: song.spotifyURL,
        dateAdded: new Date().toISOString(),
        deleted: false,
        image: song.image,
        songId: new ObjectId() // Generate a new ObjectId for the song
    };

    try {
        // Update the specific playlist by adding the new song to the songs array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId), "playlists.id": new ObjectId(playlistId) }, // Find the user and the specific playlist
            { $push: { "playlists.$.songs": newSong } } // Push the new song into the playlist's songs array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "User or playlist not found, or song not created." });
        }

        res.status(201).json({ message: "Song added successfully", song: newSong });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding the song." });
    }
});

app.post("/imy/createComment", async (req, res) => {
    const { playlistId, profileId, userId, comment } = req.body;

    //userId =  the person who commented.
    //profileId = the profile that is being commented on

    // Validate the incoming data
    if (!playlistId || !profileId || !userId || !comment) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Fetch the commenter's user details (assuming you have a way to get the user's details)
    // const userCollection = db.collection("IMY-users"); // Change this to your actual users collection name

    try {
        const commenter = await collection.findOne({ _id: new ObjectId(userId) });

        if (!commenter) {
            return res.status(404).json({ error: "Commenter not found." });
        }

        // Create a new comment object
        const newComment = {
            profileImage: commenter.profileImage || null, // Optional, can be null
            userName: commenter.username, // Assuming you have a username field in your user collection
            followers: commenter.followers || 0, // Use the number of followers from the user document
            commentText: comment,
            timestamp: new Date(), // Current timestamp
            commentId: new ObjectId(),
            pinned: false,
        };

        // Update the specific playlist by adding the new comment to the comments array
        const result = await collection.updateOne(
            { _id: new ObjectId(profileId), "playlists.id": new ObjectId(playlistId) }, // Find the user and the specific playlist
            { $push: { "playlists.$.comments": newComment } } // Push the new comment into the playlist's comments array
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "User or playlist not found, or comment not created." });
        }

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding the comment." });
    }
});

app.delete("/imy/deleteProfile/:profileId", async (req, res) => {
    const { profileId } = req.params;

    // Validate the incoming data
    if (!profileId) {
        return res.status(400).json({ error: "Profile ID is required." });
    }

    try {
        // Attempt to delete the user profile
        const result = await collection.deleteOne({ _id: new ObjectId(profileId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Profile not found." });
        }

        res.status(200).json({ message: "Profile deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the profile." });
    }
});

app.patch("/imy/editProfile", async (req, res) => {
    const { userId, profileImage, bio, username } = req.body;

    // Validate the incoming data
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    // Create an update object with the new values
    const updateData = {};
    if (profileImage) updateData.profileImage = profileImage;
    if (bio) updateData.bio = bio;
    if (username) updateData.username = username;

    try {
        // Attempt to update the user profile
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) }, // Find the user by ID
            { $set: updateData } // Update only the provided fields
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Profile not found." });
        }

        res.status(200).json({ message: "Profile updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the profile." });
    }
});

app.delete("/imy/deletePlaylist", async (req, res) => {
    const { userId, playlistId } = req.body;

    // Validate incoming data
    if (!userId || !playlistId) {
        return res.status(400).json({ error: "User ID and Playlist ID are required." });
    }

    try {
        // Attempt to delete the playlist from the user's playlists array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) }, // Find the user by userId
            { $pull: { playlists: { id: new ObjectId(playlistId) } } } // Remove the playlist by its ID
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Playlist not found or already deleted." });
        }

        res.status(200).json({ message: "Playlist deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the playlist." });
    }
});

app.put("/imy/editPlaylist", async (req, res) => {
    const { playlistId, userId, newPlaylistName, newPlaylistImage, genres, hashtags } = req.body;

    // Validate incoming data
    if (!playlistId || !userId || !newPlaylistName || !newPlaylistImage || !genres || !hashtags) {
        return res.status(400).json({ error: "Playlist ID, User ID, new Playlist Name, new Playlist Image, genres, and hashtags are required." });
    }

    try {
        // Update the playlist in the user's playlists array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId), "playlists._id": new ObjectId(playlistId) }, // Find user and playlist
            {
                $set: {
                    "playlists.$.PlayListName": newPlaylistName,       // Update playlist name
                    "playlists.$.PlayListImage": newPlaylistImage,     // Update playlist image
                    "playlists.$.genres": genres,                      // Update playlist genres
                    "playlists.$.hashtags": hashtags                   // Update playlist hashtags
                }
            }
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Playlist not found or no changes made." });
        }

        res.status(200).json({ message: "Playlist updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the playlist." });
    }
});

app.delete("/imy/deleteSong", async (req, res) => {
    const { userId, playlistId, songId } = req.body;

    // Validate incoming data
    if (!userId || !playlistId || !songId) {
        return res.status(400).json({ error: "User ID, Playlist ID, and Song ID are required." });
    }

    try {
        // Update the user's playlist to remove the song
        const result = await collection.updateOne(
            { 
                _id: new ObjectId(userId), 
                "playlists.id": new ObjectId(playlistId) // Find user and playlist
            },
            {
                $pull: {
                    "playlists.$.songs": { songId: new ObjectId(songId) } // Remove the song based on ObjectId
                }
            }
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Song not found in the specified playlist." });
        }

        res.status(200).json({ message: "Song deleted successfully." });
    } catch (err) {
        console.error("Error deleting song:", err);
        res.status(500).json({ error: "An error occurred while deleting the song." });
    }
});

app.post("/imy/friend", async (req, res) => {
    const { userId, profileId } = req.body;

    if (!userId || !profileId) {
        return res.status(400).json({ error: "User ID and Profile ID are required." });
    }

    try {
        // Find the profile (friend) to be added
        const profileToAdd = await collection.findOne({ _id: new ObjectId(profileId) });

        if (!profileToAdd) {
            return res.status(404).json({ error: "Profile to add as friend not found." });
        }

        // Add the profile as a friend to the user's friends array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $addToSet: {  // $addToSet ensures that duplicates are not added
                    friends: {
                        id: profileToAdd._id,
                        name: profileToAdd.username
                    }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "User not found or friend already added." });
        }

        res.status(200).json({ message: "Friend added successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while adding the friend." });
    }
});

app.post("/imy/unfriend", async (req, res) => {
    const { userId, profileId } = req.body;

    if (!userId || !profileId) {
        return res.status(400).json({ error: "User ID and Profile ID are required." });
    }

    try {
        // Check if the profile exists as a friend in the user's friends array
        const user = await collection.findOne({
            _id: new ObjectId(userId),
            friends: { $elemMatch: { id: new ObjectId(profileId) } }  // Check if friend exists
        });

        if (!user) {
            return res.status(404).json({ error: "Friend not found in user's friends list." });
        }

        // Remove the friend from the user's friends array
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: {
                    friends: { id: new ObjectId(profileId) }  // Remove friend by matching id
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Failed to remove friend." });
        }

        res.status(200).json({ message: "Friend removed successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while removing the friend." });
    }
});

app.post("/imy/saveplaylist", async (req, res) => {
    const { userId, playlistId, profileId } = req.body;

    // Validate that all required fields are provided
    if (!userId || !profileId || !playlistId) {
        return res.status(400).json({ error: "User ID, Playlist ID and Profile ID are required." });
    }

    try {
        const userCollection = await collection.findOne({ _id: new ObjectId(userId) });
        const ownerCollection = await collection.findOne({ _id: new ObjectId(profileId) });

        if (!userCollection) {
            return res.status(404).json({ error: "User not found." });
        }

        if (!ownerCollection) {
            return res.status(404).json({ error: "Playlist owner not found." });
        }

        // Find the original playlist by playlistId in the owner's playlists array
        const originalPlaylist = ownerCollection.playlists.find(pl => pl.id.toString() === playlistId);

        if (!originalPlaylist) {
            return res.status(404).json({ error: "Playlist not found." });
        }

        // Create a new playlist reference object to add to the user's playlists
        const playlistReference = {
            id: new ObjectId(playlistId),     // ID of the original playlist
            OwnerId: new ObjectId(profileId), // Owner of the original playlist
            reference: true                  // Indicates that this is a reference
            // PlayListName: originalPlaylist.PlayListName,
            // PlayListImage: originalPlaylist.PlayListImage,
            // OwnerImage: originalPlaylist.OwnerImage,
            // OwnerName: originalPlaylist.OwnerName,
            // songs: originalPlaylist.songs
        };

        // Push the new reference into the user's playlists array
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $push: { playlists: playlistReference } }
        );

        res.status(200).json({ message: "Playlist saved successfully as a reference." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while saving the playlist." });
    }
});

//superUser requests ::

const adminpersonels = db.collection("IMY-admin-personels");
const adminData = db.collection("IMY-admin");

app.get("/imy/admin/getUsers", async (req, res) => {
    try {
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while retrieving users." });
    }
});

app.get("/imy/admin/getGenres", async (req, res) => {
    try {
        const adminDocument = await adminData.findOne({}); // Fetch the first document in the collection
        if (!adminDocument || !adminDocument.genre) {
            return res.status(404).json({ error: "Genres not found." });
        }
        const genres = adminDocument.genre; // Access the genre array
        res.status(200).json(genres); // Return only the genre array
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while retrieving genres." });
    }
});

// Server-side endpoint (e.g., in your Express server file)const { ObjectId } = require('mongodb');

app.put("/imy/pinComment", async (req, res) => {
    const { userId, playlistId, commentId, pin } = req.body;

    // Validate incoming data
    if (!userId || !playlistId || !commentId || pin === undefined) {
        return res.status(400).json({ error: "User ID, Playlist ID, Comment ID, and pin status are required." });
    }

    try {
        // Find the specific playlist and comment by their IDs without using arrayFilters
        const result = await collection.updateOne(
            { 
                _id: new ObjectId(userId), 
                "playlists.id": new ObjectId(playlistId), 
                "playlists.comments.commentId": new ObjectId(commentId) 
            },
            {
                $set: {
                    "playlists.$.comments.$[comment].pinned": pin
                }
            },
            {
                arrayFilters: [{ "comment.commentId": new ObjectId(commentId) }]
            }
        );

        // Check if any documents were modified
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Comment not found or no changes made." });
        }

        res.status(200).json({ message: "Comment pin status updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the comment pin status." });
    }
});

//PORT TO LISTEN TO
app.listen(1337, () => {
});