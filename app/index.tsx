import { Redirect } from 'expo-router';

import { useAuth } from '@/features/profile';

export default function Index() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Redirect href="/(tabs)/explore" />;
  }

  return <Redirect href="/(auth)/login" />;
}
