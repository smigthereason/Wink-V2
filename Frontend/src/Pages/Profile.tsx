// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface Profile {
//   id: string;
//   name: string;
//   age: number;
//   bio: string;
//   // Add other profile fields as needed
// }

// interface ProfileProps {
//   userId: string;
//   isLoggedIn: boolean;
// }

// const Profile: React.FC<ProfileProps> = ({ userId, isLoggedIn }) => {
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     console.log(
//       "Profile component mounted. isLoggedIn:",
//       isLoggedIn,
//       "userId:",
//       userId
//     );
//     if (isLoggedIn && userId) {
//       fetchProfile();
//     } else {
//       setIsLoading(false);
//       if (!isLoggedIn) {
//         console.log("User is not logged in");
//       }
//       if (!userId) {
//         console.log("userId is not provided");
//       }
//     }
//   }, [isLoggedIn, userId]);

//   const fetchProfile = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       console.log("Fetching profile for userId:", userId);
//       const response = await axios.get(
//         `http://localhost:5000/profile/${userId}`
//       );
//       console.log("Profile API response:", response.data);
//       if (response.data && response.data.profile) {
//         setProfile(response.data.profile);
//       } else {
//         console.log("No profile data in response, showing modal");
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       if (axios.isAxiosError(error) && error.response?.status === 404) {
//         console.log("Profile not found, showing modal");
//         setShowModal(true);
//       } else {
//         setError("Failed to fetch profile. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const createOrUpdateProfile = async (profileData: Omit<Profile, "id">) => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       console.log(
//         "Creating/Updating profile for userId:",
//         userId,
//         "with data:",
//         profileData
//       );
//       const response = await axios.post(
//         `http://localhost:5000/profile/${userId}`,
//         profileData
//       );
//       console.log("Create/Update profile API response:", response.data);
//       if (response.data && response.data.profile) {
//         setProfile(response.data.profile);
//         setShowModal(false);
//       } else {
//         throw new Error("No profile data received from server");
//       }
//     } catch (error) {
//       console.error("Error creating/updating profile:", error);
//       setError("Failed to create/update profile. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   console.log(
//     "Rendering profile component. isLoggedIn:",
//     isLoggedIn,
//     "isLoading:",
//     isLoading,
//     "profile:",
//     profile
//   );

//   if (!isLoggedIn) {
//     return <div>Please log in to view your profile.</div>;
//   }

//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       {profile ? (
//         <div>
//           <h2>{profile.name}</h2>
//           <p>Age: {profile.age}</p>
//           <p>Bio: {profile.bio}</p>
//           <button onClick={() => setShowModal(true)}>Edit Profile</button>
//         </div>
//       ) : (
//         <div>
//           <p>No profile found. Please create one.</p>
//           <button onClick={() => setShowModal(true)}>Create Profile</button>
//         </div>
//       )}

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowModal(false)}>
//               &times;
//             </span>
//             <ProfileForm
//               onSubmit={createOrUpdateProfile}
//               initialData={profile}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// interface ProfileFormProps {
//   onSubmit: (profile: Omit<Profile, "id">) => void;
//   initialData: Profile | null;
// }

// const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
//   const [name, setName] = useState(initialData?.name || "");
//   const [age, setAge] = useState(initialData?.age?.toString() || "");
//   const [bio, setBio] = useState(initialData?.bio || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       name,
//       age: parseInt(age, 10),
//       bio,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Age"
//         required
//       />
//       <textarea
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//         placeholder="Bio"
//         required
//       />
//       <button type="submit">
//         {initialData ? "Update Profile" : "Create Profile"}
//       </button>
//     </form>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  preferences: string;
  occupation: string;
  photos: string;
  gender: string;
}

interface ProfileProps {
  userToken: string;
  isLoggedIn: boolean;
}

const Profile: React.FC<ProfileProps> = ({ userToken, isLoggedIn }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    console.log(
      "Profile component mounted. isLoggedIn:",
      isLoggedIn,
      "userId:",
      userToken
    );
    if (isLoggedIn && userToken) {
      fetchProfile();
    } else {
      setIsLoading(false);
      if (!isLoggedIn) {
        console.log("User is not logged in");
      }
      if (!userToken) {
        console.log("userId is not provided");
      }
    }
  }, [isLoggedIn, userToken]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching profile for userId:", userToken);
      const response = await axiosInstance.get("/profile/0");
      console.log("Profile API response:", response.data);
      if (response.data && response.data.profile) {
        setProfile(response.data.profile);
      } else {
        console.log("No profile data in response, showing modal");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("Profile not found, showing modal");
        setShowModal(true);
      } else {
        setError("Failed to fetch profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createOrUpdateProfile = async (profileData: Omit<Profile, "id">) => {
    setIsLoading(true);
    setError(null);
    console.log(
      "Creating/Updating profile for userId:",
      userToken,
      "with data:",
      profileData
    );

    // try {
    axiosInstance
      .post("/profile", { ...profileData })
      .then((response) => {
        console.log(response.data);
        if (response.data && response.data.profile) {
          setProfile(response.data.profile);
          setShowModal(false);
        } else {
          //throw new Error("No profile data received from server");
        }
      })
      .catch((error) => {
        console.error("Error creating/updating profile:", error);
        setError("Failed to create/update profile. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    //   const response = await axiosInstance.post("/profile", {
    //     ...profileData,
    //   });
    //   console.log("Create/Update profile API response:", response.data);

    // } catch (error) {
    //   console.error("Error creating/updating profile:", error);
    //   setError("Failed to create/update profile. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  console.log(
    "Rendering profile component. isLoggedIn:",
    isLoggedIn,
    "isLoading:",
    isLoading,
    "profile:",
    profile
  );

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>Age: {profile.age}</p>
          <p>Bio: {profile.bio}</p>
          <button onClick={() => setShowModal(true)}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <p>No profile found. Please create one.</p>
          <button onClick={() => setShowModal(true)}>Create Profile</button>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <ProfileForm
              onSubmit={createOrUpdateProfile}
              initialData={profile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface ProfileFormProps {
  onSubmit: (profile: Omit<Profile, "id">) => void;
  initialData: Profile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age?.toString() || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [preferences, setPreferences] = useState(
    initialData?.preferences || ""
  );
  const [gender, setGender] = useState(initialData?.gender || "");
  const [occupation, setOccupation] = useState(initialData?.occupation || "");
  const [photos, setPhotos] = useState(initialData?.photos || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      age: parseInt(age, 10),
      bio,
      preferences,
      gender,
      occupation,
      photos,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        required
      />
      <textarea
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        placeholder="male, female or both"
        required
      />
      <textarea
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        required
      />
      <textarea
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Occupation"
        required
      />
      <textarea
        value={photos}
        onChange={(e) => setPhotos(e.target.value)}
        placeholder="Photos"
        required
      />
      <button type="submit">
        {initialData ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
};

export default Profile;
