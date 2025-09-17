"use client"

export interface User {
  name: string
  email: string
  registeredAt: string
}

export const authUtils = {
  // Get current user
  getCurrentUser: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("neurocare_user")
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("neurocare_user")
  },

  // Login user
  login: (username: string): void => {
    localStorage.setItem("neurocare_user", username)
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem("neurocare_user")
    localStorage.removeItem("neurocare_moods")
    localStorage.removeItem("neurocare_streaks")
    localStorage.removeItem("neurocare_badges")
  },

  // Register user
  register: (userData: User): void => {
    const existingUsers = JSON.parse(localStorage.getItem("neurocare_users") || "[]")
    existingUsers.push(userData)
    localStorage.setItem("neurocare_users", JSON.stringify(existingUsers))
    localStorage.setItem("neurocare_user", userData.name)
  },

  // Get user profile data
  getUserProfile: (): User | null => {
    if (typeof window === "undefined") return null

    const currentUser = localStorage.getItem("neurocare_user")
    if (!currentUser) return null

    // First try to get from registered users
    const users = JSON.parse(localStorage.getItem("neurocare_users") || "[]")
    const foundUser = users.find((user: User) => user.name === currentUser || user.email.split("@")[0] === currentUser)
    
    if (foundUser) return foundUser

    // Fallback: create a basic user profile from stored username
    return {
      name: currentUser,
      email: `${currentUser}@example.com`, // Placeholder email
      registeredAt: new Date().toISOString()
    }
  },
}
