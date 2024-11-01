
export async function signUp(data) {
    data.bio = "Hello world!";
    data.profileImage = getRandomImageUrl();
    return fetch('/imy/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Error signing up');
        }
        return response.json();
    }).catch(error => {
        console.error("Sign-up request failed:", error.message); // Debugging log
        throw error;
    });
}

export const login = async (data) => {
    const response = await fetch("/imy/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.json();
};

export const getPlaylists = async (id) => {
    const response = await fetch(`/imy/playlists/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch playlists");
    }
    return response.json();
};

export const getGeneralPlaylists = async () => {
    const response = await fetch("/imy/generalPlaylists");
    if (!response.ok) {
        throw new Error("Failed to fetch general playlists");
    }
    return response.json();
}

export async function getPlaylistById(id) {
    // console.log(id);
    return fetch(`/imy/playlist/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch playlist with ID ${id}`);
            }
            return response.json();
        });
}

export async function getUserById(id) {
    const response = await fetch(`/imy/user/${id}`)
    if (!response.ok) {
        // console.log(response);
        throw new Error(`Failed to fetch user with ID ${id}`);
    }
    // console.log(response);
    return response.json();
}

export const createComment = async (data) => {
    const response = await fetch("/imy/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            playlistId: data.playlistId,
            profileId: data.profileId,
            userId: data.userId,
            comment: data.comment,
            image: data.image
        }),
    });
    if (!response.ok) {
        throw new Error("comment creation failed");
    }
    return response.json();
};

export const updateProfile = async (data) => {
    const response = await fetch("/imy/editProfile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: data.username,
            profileImage: data.profileImage,
            userId: data.userId,
            bio: data.bio
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }
    return response.json();
}

export const getRandomImageUrl = () => { // TO BE USED WHEN REGISTERING
    let imgNo = Math.floor(Math.random() * 10) + 1;
    let endpointImage = `pfp${imgNo}.jpg`;
    return (`/assets/images/USERS-PROFILE-PICTURES/${endpointImage}`);
}

export const toggleFriend = async (flag, data) => {
    const response = await fetch(`/imy/${flag ? 'friend' : 'unfriend'}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: data.userId,
            profileId: data.profileId
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to add/unfriend user");
    }
    return response.json();
}

export const savePlaylist = async (userId, profileId, playlistId) => {
    const response = await fetch(`/imy/savePlaylist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            profileId: profileId,
            playlistId: playlistId
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to save playlist");
    }
    return response.json();
}

export const addSong = async (userId, playlistId, song) => {
    const response = await fetch(`/imy/createSong`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            playlistId: playlistId,
            song: song
        }),
    });
    if (!response.ok) {
        const errorData = await response.json(); // Parse the response body to get error details
        throw new Error(errorData.error || "Failed to save song");
    }
    return response.json();
}

export const deleteSong = async (userId, playlistId, songId) => {
    const response = await fetch(`/imy/deleteSong`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            playlistId: playlistId,
            songId: songId
        }),
    });
    if (!response.ok) {
        const errorData = await response.json(); // Parse the response body to get error details
        throw new Error(errorData.error || "Failed to delete song");
    }
    return response.json();
}

export const editPlaylist = async (userId, playlistId, data) => {
    // console.log("Edit playlist: ", userId, playlistId, data);
    const response = await fetch(`/imy/editPlaylist`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            playlistId: playlistId,
            newPlaylistName: data.newPlaylistName,
            newPlaylistImage: data.newPlaylistImage,
            genres: data.genres,
            hashtags: data.hashtags
        }),
    });
    if (!response.ok) {
        const errorData = await response.json(); // Parse the response body to get error details
        throw new Error(errorData.error || "Failed to update playlist");
    }
    return response.json();
}

export const getGenres = async () => {
    const response = await fetch(`/imy/admin/getGenres`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const errorData = await response.json(); // Parse the response body to get error details
        throw new Error(errorData.error || "Failed to fetch genres");
    }
    return response.json();
}

export const deletePlaylist = async (userId, playlistId) => {
    const response = await fetch(`/imy/deletePlaylist`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: userId,
            playlistId: playlistId
        }),
    });
    if (!response.ok) {
        const errorData = await response.json(); // Parse the response body to get error details
        throw new Error(errorData.error || "Failed to delete playlist");
    }
    return response.json();
}

// Client-side function to call the endpoint
export const pinComment = async (userId, playlistId, commentId, pin) => {
    try {
        const response = await fetch(`/imy/pinComment`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                playlistId,
                commentId,
                pin
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update comment pin status");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating comment pin status:", error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await fetch(`/imy/admin/getUsers`, {
            method: "GET", // Use GET method to retrieve data
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch users");
        }

        return await response.json(); // Return the users data
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// genreAction.js
export async function genreAction(flag, genre) {
    try {
        const response = await fetch('/imy/admin/genreAction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flag, genre })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        // console.log('Action successful:', result);
        return result; // Return the response if needed elsewhere
    } catch (error) {
        console.error('Error performing genre action:', error);
    }
}

export async function deleteProfile(profileId) {
    if (!profileId) {
        throw new Error("Profile ID is required.");
    }

    try {
        const response = await fetch(`/imy/Admin/deleteProfile/${profileId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while deleting the profile.");
        }

        const data = await response.json();
        // console.log(data.message); // Profile deleted successfully
        return data.message;
    } catch (error) {
        console.error("Error deleting profile:", error.message);
        throw error;
    }
}

export async function createPlaylist(userId, data) {
    // console.log("Submitting playlist with data:", playlistName, image);

    if (!userId || !data) {
        throw new Error("User ID and playlist data are required.");
    }

    try {
        const response = await fetch(`/imy/createPlaylist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, playlistName: data.playlistName, playlistImage: data.playlistImage })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "An error occurred while adding the playlist.");
        }

        const responseData = await response.json();
        // console.log("Response from server:", responseData.message);
        return responseData;
    } catch (error) {
        console.error("Error creating playlist:", error.message);
        throw error;
    }
}