import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return { data, error };
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // Check what are we gonna update (fullName or password)
  let updateData;
  if (password) updateData = { password };

  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  // if we dont have avatar then we are finished
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`.replaceAll(
    "/",
    ""
  );

  const avatarName = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  // Upload the avatar
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // Update the user with avatar
  const { data: updatedData, error: uploadError } =
    await supabase.auth.updateUser({ data: { avatar: avatarName } });

  if (uploadError) throw new Error(uploadError.message);

  return updatedData;
}
