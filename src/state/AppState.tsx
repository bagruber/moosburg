import { createContext, useCallback, useContext, useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
 * Cross-route prototype state.
 *
 * Why Context (not localStorage)?
 * CLAUDE.md forbids localStorage/sessionStorage — state lives in memory and
 * resets on full reload. That is fine for Stakeholder demos: the flow
 * "log in → fill profile → book appointment → see it in account" all happens
 * in one session.
 * ───────────────────────────────────────────────────────────────────── */

export type AgeGroup = "u18" | "18-30" | "31-50" | "51-65" | "65plus" | "unset";
export type ChildAge = "0-3" | "4-6" | "7-10" | "11-14" | "15-18";

export type Profile = {
  email: string;
  name: string;
  address: string;
  ageGroup: AgeGroup;
  ownsProperty: boolean;
  hasChildren: boolean;
  childAges: ChildAge[];
  newInTown: boolean;
  worksInMoosburg: boolean;
  ownsCar: boolean;
  ownsDog: boolean;
  receivesPension: boolean;
};

const emptyProfile: Profile = {
  email: "",
  name: "",
  address: "",
  ageGroup: "unset",
  ownsProperty: false,
  hasChildren: false,
  childAges: [],
  newInTown: false,
  worksInMoosburg: false,
  ownsCar: false,
  ownsDog: false,
  receivesPension: false,
};

export type Booking = {
  id: string;
  service: string;
  category: string;
  date: string;        // ISO YYYY-MM-DD
  time: string;        // HH:MM
  location: string;
  reference: string;   // e.g. "T-2026-0418"
  createdAt: number;
};

type AppStateValue = {
  signedIn: boolean;
  profile: Profile;
  bookings: Booking[];
  signIn: (email: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  addBooking: (b: Omit<Booking, "id" | "reference" | "createdAt">) => Booking;
  removeBooking: (id: string) => void;
};

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const signIn = useCallback((email: string) => {
    setSignedIn(true);
    setProfile((p) => ({ ...p, email }));
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
    setProfile(emptyProfile);
    setBookings([]);
  }, []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...patch }));
  }, []);

  const addBooking: AppStateValue["addBooking"] = useCallback((b) => {
    const id = `${Date.now()}`;
    const ref = `T-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const booking: Booking = { ...b, id, reference: ref, createdAt: Date.now() };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  }, []);

  const removeBooking = useCallback((id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({ signedIn, profile, bookings, signIn, signOut, updateProfile, addBooking, removeBooking }),
    [signedIn, profile, bookings, signIn, signOut, updateProfile, addBooking, removeBooking],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used inside <AppStateProvider>");
  return v;
}
