export type SessionContextValue = {
  isSignedIn: boolean;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};
