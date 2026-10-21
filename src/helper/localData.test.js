import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import {
  ensureDemoUsers,
  getUsers,
  saveUsers,
  setSession,
  getSessionUserId,
  clearSession,
  getEvents,
  updateEvent,
  addParticipant,
  getEventParticipants,
  defaultEvent,
} from "./localData";

describe("localData storage helper", () => {
  beforeAll(() => {
    const store = new Map();
    globalThis.localStorage = {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, val) => store.set(key, String(val)),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
    };
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("ensures demo users are seeded when storage is empty", () => {
    ensureDemoUsers();
    const users = getUsers();
    expect(users.length).toBeGreaterThanOrEqual(2);
    expect(users.some((u) => u.email === "admin@demo.com")).toBe(true);
    expect(users.some((u) => u.email === "user@demo.com")).toBe(true);
  });

  it("handles user session storage accurately", () => {
    setSession("user-123");
    expect(getSessionUserId()).toBe("user-123");
    clearSession();
    expect(getSessionUserId()).toBeNull();
  });

  it("returns default event when no custom events exist", () => {
    const events = getEvents();
    expect(events.length).toBe(1);
    expect(events[0].id).toBe(defaultEvent.id);
  });

  it("updates an existing event and persists changes", () => {
    updateEvent({
      id: "robowar",
      eventTitle: "ROBOWAR CHAMPIONSHIP 2026",
    });

    const events = getEvents();
    const robowar = events.find((e) => e.id === "robowar");
    expect(robowar.eventTitle).toBe("ROBOWAR CHAMPIONSHIP 2026");
  });

  it("registers a participant for an event without duplicates", () => {
    const participant = {
      userID: "user-test",
      displayName: "Test Student",
      email: "test@student.com",
    };

    addParticipant("robowar", participant);
    let list = getEventParticipants("robowar");
    expect(list.length).toBe(1);
    expect(list[0].email).toBe("test@student.com");

    // Add again with updated name
    addParticipant("robowar", {
      ...participant,
      displayName: "Updated Test Student",
    });
    list = getEventParticipants("robowar");
    expect(list.length).toBe(1);
    expect(list[0].displayName).toBe("Updated Test Student");
  });
});
