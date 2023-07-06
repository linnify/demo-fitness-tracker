import { useSession, useSignOut } from '@app/lib/auth/hooks';
import { User, UserProfile } from '@app/types/user.type';

/**
 * Load the current user using the react-tanstack library.
 */
export const useUserSession = () => {
  const data = useSession<UserProfile>();
  const { onLogout, isLoading: isSigningOut } = useSignOut('/auth');

  if (data.isError) {
    console.log('Is Error ', data);
  }

  return {
    user: data.data as UserProfile,
    isLoading: data.isLoading || isSigningOut
  };
};
