
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
