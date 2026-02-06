const USERS_KEY = "vp_demo_users";
const SESSION_KEY = "vp_demo_session";
const PARTICIPANTS_KEY = "vp_demo_participants";

const demoUsers = [
  {
    id: "demo-admin",
    displayName: "Demo Admin",
    email: "admin@demo.com",
    password: "admin123",
    number: "9999999999",
    role: "admin",
    department: "Information Technology",
    rollno: "ADMIN-001",
    dob: "2000-01-01",
    bio: "Demo admin account",
  },
  {
    id: "demo-user",
    displayName: "Demo User",
    email: "user@demo.com",
    password: "user123",
    number: "8888888888",
    role: "user",
    department: "Computer Engineering",
    rollno: "USER-001",
    dob: "2002-01-01",
    bio: "Demo user account",
  },
];

export const defaultEvent = {
  id: "robowar",
  eventTitle: "ROBOWAR",
  eventBrief:
    "The Challenge is to design and build a robot competent to fight other robots in the Battle. The competition is carried out in a tournament format in which the competitors bring their wireless robots ready to battle and are pitted against their competitor’s robots in one-one",
  eventDesc:
    "The Challenge is to design and build a robot competent to fight other robots in the Battle. The competition is carried out in a tournament format in which the competitors bring their wireless robots ready to battle and are pitted against their competitor’s robots in one-one matches where the aim is to cause maximum damage or to push the opponent’s robot off the arena to score maximum points. Team scoring the maximum points wins the championship. The challenge has two participation categories as per the gross weight of the Robot.",
  eventThumbnailURL: `${process.env.PUBLIC_URL}/assets/robowar.png`,
  eventTimeStart: "2022-05-05T11:00",
  eventTimeEnd: "2022-05-06T18:00",
};

export function ensureDemoUsers() {
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }
}

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setSession(userId) {
  localStorage.setItem(SESSION_KEY, userId);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionUserId() {
  return localStorage.getItem(SESSION_KEY);
}

export function getParticipants() {
  const raw = localStorage.getItem(PARTICIPANTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveParticipants(participants) {
  localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(participants));
}

export function addParticipant(eventId, participant) {
  const participants = getParticipants();
  const list = participants[eventId] || [];
  const filtered = list.filter((p) => p.email !== participant.email);
  participants[eventId] = [...filtered, participant];
  saveParticipants(participants);
}

export function getEventParticipants(eventId) {
  const participants = getParticipants();
  return participants[eventId] || [];
}
