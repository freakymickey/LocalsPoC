import { useEffect } from 'react';
import { getSupabase } from './Supabase';

let AuthListenerHandle;

export const AuthListener = ({ navigation }) => {
  const supabase = getSupabase();

  useEffect(() => {
    if (AuthListenerHandle) {
      console.log('AuthListener already initialized!', AuthListenerHandle);

      supabase.auth
        .getSession()
        .then(({ data }) => {
          const session = data?.session;
          if (!session) {
            navigation.replace('Screen4LogIn');
          } else {
            const user = session.user;
            navigation.replace('Screen2SetUpUser', {
              created_at: user.created_at,
            });
          }
        })
        .catch(error => {
          console.error('Error fetching session:', error);
        });
      return;
    }

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'INITIAL_SESSION') {
        if (!session) {
          setTimeout(() => navigation.replace('Screen4LogIn'), 1000);
        } else {
          navigation.replace('Screen2SetUpUser', {
            created_at: session.user.created_at,
          });
        }
      } else if (event === 'SIGNED_IN') {
        navigation.replace('Screen2SetUpUser', {
          created_at: session.user.created_at,
        });
      } else if (event === 'SIGNED_OUT') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Screen4LogIn' }],
        });
      }
    });

    AuthListenerHandle = data;

    return () => {
      console.log('Cleanup AuthListener', AuthListenerHandle);
      // listener stays alive intentionally
    };
  }, []);

  return null;
};
