import { del, get, set } from "@upstash/redis";

const USER_PREFIX = "user:";
const USERNAME_PREFIX = "user:username:";

export interface UserType {
  username: string;
  profile_image_url: string;
  name: string;
  emailVerified: string;
  id: string;
}

export async function getUserById(userId: string) {
  const response = await get(USER_PREFIX + userId);
  if (!response.data) return null;

  let user = JSON.parse(response.data);

  return user as UserType;
}

export async function updateUser(userId: string, updates: {}) {
  const user = await getUserById(userId);
  await set(USER_PREFIX + userId, JSON.stringify({ ...user, ...updates }));
}

export async function getUserIdByUsername(username: string) {
  const response = await get(USERNAME_PREFIX + username);
  if (!response.data) return null;

  return response.data;
}

export async function updateUsername(userId: string, username: string) {
  const promisses = [];

  const responseUsername = await get(USERNAME_PREFIX + username);
  // there's already a username entry
  if (responseUsername.data) {
    const userIdCurrent = responseUsername.data;
    // it's the user, that's ok!
    if (userIdCurrent === userId) {
      return false;
    }

    const userCurrent = await getUserById(userIdCurrent);
    // Another user have this username, remove it
    if (userCurrent && userCurrent.username === username) {
      const userCurrentUpdate = { ...userCurrent, username: undefined };
      promisses.push(
        set(USER_PREFIX + userIdCurrent, JSON.stringify(userCurrentUpdate))
      );
    }
  }

  promisses.push(set(USERNAME_PREFIX + username, userId));

  const user = await getUserById(userId);

  if (user.username) {
    if (user.username !== username) {
      promisses.push(
        set(USER_PREFIX + userId, JSON.stringify({ ...user, username }))
      );

      const previousUsernameResponse = await get(
        USERNAME_PREFIX + user.username
      );
      // previous username was for this user, delete it
      if (previousUsernameResponse?.data === userId) {
        promisses.push(del(USERNAME_PREFIX + user.username));
      }
    }
  } else {
    promisses.push(
      set(USER_PREFIX + userId, JSON.stringify({ ...user, username }))
    );
  }

  await Promise.all(promisses);
  return true;
}
