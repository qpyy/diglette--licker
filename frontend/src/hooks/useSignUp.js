import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { signUpService } from "../services";

export const useSignUp = () => {
  const { setUser, setAccessToken, setRefreshToken } = useStore((state) => ({
    setUser: state.setUser,
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
  }));

  const signUpMutation = useMutation({
    mutationFn: signUpService,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
  });

  return {
    signUp: signUpMutation.mutateAsync,
    isLoading: signUpMutation.isLoading,
    isError: signUpMutation.isError,
    error: signUpMutation.error,
  };
};
