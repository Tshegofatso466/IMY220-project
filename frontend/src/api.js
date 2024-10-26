
export async function signUp(data) {
    return fetch('https://localhost:1337/imy/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error signing up');
            }
            return response.json();
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

export async function getPlaylistById(id) {
    console.log(id);
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
            comment: data.comment
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

export const getRandomImageUrl = async () => { // TO BE USED WHEN REGISTERING
    let imgNo = Math.floor(Math.random() * 10) + 1;
    let endpointImage = `pfp${imgNo}.jpg`;
    return (`/assets/images/USERS-PROFILE-PICTURES/${endpointImage}`);
}

export const toggleFriend = async (flag, data) => {
    const response = await fetch(`/imy/${flag ? 'friend':'unfriend'}`, {
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
