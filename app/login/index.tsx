import { AppText } from "@/components/commons/AppText";
import { Button } from "@/components/commons/Button";
import { InputBox } from "@/components/commons/InputBox";
import { theme } from "@/constants/theme";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { authenticateUser } from "@/store/slices/auth";
import Toast from "react-native-toast-message";
import { Screen } from "@/components/commons/Screen";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { username, password } = data;
    try {
      await dispatch(authenticateUser(username, password));
      router.push("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <Screen testID="login-screen">
      <View style={styles.container} testID="login-container">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <AppText style={styles.title} testID="login-title">
          Login.
        </AppText>
        <Controller
          control={control}
          name="username"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputBox
              label="Username"
              isRequired
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error?.message}
              testID="username-input"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputBox
              label="Password"
              isPassword
              isRequired
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={error?.message}
              testID="password-input"
            />
          )}
        />
        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          testID="login-button"
        >
          Login
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "bold",
    marginBottom: theme.spacing.lg,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
