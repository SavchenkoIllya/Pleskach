import { auth } from "@/auth";
import { Session } from "next-auth";
import { useState, useEffect } from "react";

export default function useSession() {
  const [session, setSession] = useState<Session>();

  const fetchSession = async () => {
    return await auth();
  };

  useEffect(() => {
    fetchSession().then((ses) => {
      if (ses) setSession(ses);
    });
  }, []);
  return session;
}
