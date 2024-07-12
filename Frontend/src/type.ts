// src/types.ts

export interface Profile {
    user_id: number;
    name: string;
    age: number;
    occupation: string;
    preferences: string;
    hobbies: string;
    bio: string;
    photos: string; // Assuming it's stored as a comma-separated string
}
