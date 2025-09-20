import { createClient } from '@supabase/supabase-js';
import * as GlobalVariableContext from '../config/GlobalVariableContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

// use closure as GlobalVariableContext cannot be used during import
const getSupabase = (() => {
  let supabase;
  return () => {
    if (supabase === undefined) {
      console.log('Initializing Supabase...');
      const variables = GlobalVariableContext.useValues();
      const SUPABASE_URL = variables.SupabaseUrl;
      const SUPABASE_ANON_KEY = variables.ApiKeyHeader;
      supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      });

      AppState.addEventListener('change', state => {
        if (state === 'active') {
          supabase.auth.startAutoRefresh();
        } else {
          supabase.auth.stopAutoRefresh();
        }
      });
    }

    return supabase;
  };
})();

export { getSupabase };
