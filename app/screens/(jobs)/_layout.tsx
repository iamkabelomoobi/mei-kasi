import { Stack } from "expo-router";

const JobsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobsScreen" />
      <Stack.Screen name="JobDetailScreen" />
    </Stack>
  );
};

export default JobsLayout;
