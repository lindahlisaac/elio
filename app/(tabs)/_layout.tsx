import { Redirect, Tabs } from 'expo-router';

import { useAuth } from '@/features/profile';

export default function TabsLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explore', headerTitle: 'Explore' }}
      />
      <Tabs.Screen
        name="activities"
        options={{ title: 'Activities', headerTitle: 'Activities' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', headerTitle: 'Profile' }}
      />
    </Tabs>
  );
}
