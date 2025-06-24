import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/splash/splash");
    }, 0); // atraso mínimo para evitar erro

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
