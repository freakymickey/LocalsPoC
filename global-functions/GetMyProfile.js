import * as Supabase from '../custom-files/Supabase';

const GetMyProfile = async setGlobalVariableValue => {
  const supabase = Supabase.getSupabase();

  const { data, error } = await supabase.rpc('get_my_profile');
  if (error) {
    console.log('Error fetching profile:', error);
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    console.log('No profile row returned');
    return null;
  }

  setGlobalVariableValue({ key: 'ProfileId', value: row.id });
  setGlobalVariableValue({ key: 'ProfileName', value: row.name ?? '' });
  setGlobalVariableValue({ key: 'AvatarImage', value: row.avatar_url ?? '' });

  console.log('Profile variables set:', row);
  return row;
};

export default GetMyProfile;
