import { Json } from '@/assets/Json';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, TextInput as PaperInput } from 'react-native-paper';

const AddCredential = () => {
  const router = useRouter();

  // State variables
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Handle password strength dynamically
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!title || !username || !password || !website) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const newCredential = { title, username, password, website };
    console.log('New Credential:', newCredential);
    router.push('/');
  };

  // Animate the form when mounted
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View
        style={{ flex: 1, backgroundColor: '#2A2A2A', opacity: fadeAnim }}
        className="p-6 justify-center space-y-4"
      >
        <Text className="text-3xl text-white mb-6">Add New Credential</Text>

        {/* Animated Inputs */}
        <View className="relative">
          <PaperInput
            value={title}
            onChangeText={setTitle}
            placeholder="Credential Title"
            mode="outlined"
            placeholderTextColor="#B0B0B0"
            theme={{ colors: { primary: '#34D399' } }}
            style={{ marginBottom: 10 }}
          />
        </View>

        <PaperInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          mode="outlined"
          placeholderTextColor="#B0B0B0"
          theme={{ colors: { primary: '#34D399' } }}
          style={{ marginBottom: 10 }}
        />

        {/* Animated Password Input */}
        <PaperInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          secureTextEntry
          mode="outlined"
          placeholderTextColor="#B0B0B0"
          theme={{ colors: { primary: '#34D399' } }}
          style={{ marginBottom: 10 }}
        />

        {/* Password Strength Indicator */}
        <Text className="text-white mb-2">Password Strength:</Text>
        <LottieView
          source={passwordStrength === 3 ? Json.strong : Json.strong}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />

        <PaperInput
          value={website}
          onChangeText={setWebsite}
          placeholder="Website (e.g., google.com)"
          mode="outlined"
          placeholderTextColor="#B0B0B0"
          theme={{ colors: { primary: '#34D399' } }}
          style={{ marginBottom: 20 }}
        />

        {/* Progress Bar */}
        <View className="h-2 bg-gray-700 rounded-lg mb-4">
          <View
            style={{
              width: `${((passwordStrength + (title && username && website ? 1 : 0)) / 4) * 100}%`,
              height: '100%',
              backgroundColor: '#3B82F6',
            }}
            className="rounded-lg"
          />
        </View>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ marginBottom: 20 }}
        >
          Save Credential
        </Button>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AddCredential;
