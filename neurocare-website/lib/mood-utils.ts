"use client"

export interface MoodEntry {
  id: string
  text: string
  mood: string
  emoji: string
  confidence: number
  suggestion: string
  timestamp: string
}

export interface StreakData {
  current: number
  longest: number
  lastEntry: string
}

const moodAnalysis = {
  happy: {
    emoji: "😊",
    suggestions: [
      "Your positive energy is wonderful! Consider sharing this joy with someone you care about.",
      "Great to see you feeling happy! This is a perfect time to practice gratitude for what's going well.",
      "Your happiness is contagious! Maybe try a new activity or hobby while you're feeling so positive.",
    ],
  },
  sad: {
    emoji: "😢",
    suggestions: [
      "It's okay to feel sad sometimes. Consider reaching out to a friend or practicing gentle self-care.",
      "Sadness is a natural emotion. Try some deep breathing exercises or a short walk outside.",
      "Remember that this feeling will pass. Consider journaling or listening to calming music.",
    ],
  },
  anxious: {
    emoji: "😰",
    suggestions: [
      "Anxiety can be overwhelming. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8.",
      "When anxious, grounding techniques can help. Name 5 things you can see, 4 you can touch, 3 you can hear.",
      "Consider breaking down what's making you anxious into smaller, manageable steps.",
    ],
  },
  calm: {
    emoji: "😌",
    suggestions: [
      "This peaceful state is precious. Consider practicing mindfulness to maintain this calm feeling.",
      "Your calmness is a strength. This might be a good time for reflection or meditation.",
      "Enjoy this tranquil moment. Consider what helped you achieve this state of calm.",
    ],
  },
  excited: {
    emoji: "🤩",
    suggestions: [
      "Your excitement is energizing! Channel this positive energy into something creative or productive.",
      "Excitement is wonderful! Consider sharing your enthusiasm with others or starting a new project.",
      "This high energy is great! Make sure to also take moments to breathe and stay grounded.",
    ],
  },
  stressed: {
    emoji: "😤",
    suggestions: [
      "Stress is challenging. Try progressive muscle relaxation or take a few minutes to step away from stressors.",
      "When stressed, prioritizing tasks can help. Focus on what's most important and let go of what you can't control.",
      "Consider taking short breaks throughout your day and practicing deep breathing exercises.",
    ],
  },
  neutral: {
    emoji: "😐",
    suggestions: [
      "Neutral feelings are completely normal. This might be a good time for self-reflection or trying something new.",
      "Sometimes feeling neutral gives us space to appreciate the small things around us.",
      "This balanced state can be peaceful. Consider what small thing might bring you a bit of joy today.",
    ],
  },
}

export const moodUtils = {
  analyzeMood: (text: string): MoodEntry => {
    const lowerText = text.toLowerCase()
    let detectedMood = "neutral"
    let confidence = 70

    // Simple keyword-based mood detection
    if (
      lowerText.includes("happy") ||
      lowerText.includes("joy") ||
      lowerText.includes("great") ||
      lowerText.includes("wonderful") ||
      lowerText.includes("amazing")
    ) {
      detectedMood = "happy"
      confidence = 85
    } else if (
      lowerText.includes("sad") ||
      lowerText.includes("down") ||
      lowerText.includes("depressed") ||
      lowerText.includes("upset")
    ) {
      detectedMood = "sad"
      confidence = 80
    } else if (
      lowerText.includes("anxious") ||
      lowerText.includes("worried") ||
      lowerText.includes("nervous") ||
      lowerText.includes("panic")
    ) {
      detectedMood = "anxious"
      confidence = 90
    } else if (
      lowerText.includes("calm") ||
      lowerText.includes("peaceful") ||
      lowerText.includes("relaxed") ||
      lowerText.includes("serene")
    ) {
      detectedMood = "calm"
      confidence = 85
    } else if (lowerText.includes("excited") || lowerText.includes("thrilled") || lowerText.includes("energetic")) {
      detectedMood = "excited"
      confidence = 88
    } else if (lowerText.includes("stressed") || lowerText.includes("overwhelmed") || lowerText.includes("pressure")) {
      detectedMood = "stressed"
      confidence = 85
    }

    const moodData = moodAnalysis[detectedMood as keyof typeof moodAnalysis]
    const randomSuggestion = moodData.suggestions[Math.floor(Math.random() * moodData.suggestions.length)]

    return {
      id: Date.now().toString(),
      text,
      mood: detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1),
      emoji: moodData.emoji,
      confidence,
      suggestion: randomSuggestion,
      timestamp: new Date().toISOString(),
    }
  },

  saveMoodEntry: (mood: MoodEntry): void => {
    const existingMoods = JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
    existingMoods.unshift(mood) // Add to beginning for chronological order
    localStorage.setItem("neurocare_moods", JSON.stringify(existingMoods))
  },

  getAllMoods: (): MoodEntry[] => {
    return JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
  },

  getMoodById: (id: string): MoodEntry | null => {
    const moods = JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
    return moods.find((mood: MoodEntry) => mood.id === id) || null
  },

  deleteMoodEntry: (id: string): void => {
    const moods = JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
    const filteredMoods = moods.filter((mood: MoodEntry) => mood.id !== id)
    localStorage.setItem("neurocare_moods", JSON.stringify(filteredMoods))
  },

  getStreaks: (): StreakData => {
    const streaks = JSON.parse(
      localStorage.getItem("neurocare_streaks") || '{"current": 0, "longest": 0, "lastEntry": ""}',
    )
    return streaks
  },

  updateStreaks: (): void => {
    const moods = JSON.parse(localStorage.getItem("neurocare_moods") || "[]")
    if (moods.length === 0) return

    const today = new Date().toDateString()
    const streaks = moodUtils.getStreaks()

    // Check if user has already logged today
    const todayEntries = moods.filter((mood: MoodEntry) => new Date(mood.timestamp).toDateString() === today)

    if (todayEntries.length > 0 && streaks.lastEntry !== today) {
      streaks.current += 1
      streaks.longest = Math.max(streaks.longest, streaks.current)
      streaks.lastEntry = today
      localStorage.setItem("neurocare_streaks", JSON.stringify(streaks))
    }
  },

  getBadges: (): string[] => {
    return JSON.parse(localStorage.getItem("neurocare_badges") || "[]")
  },

  checkAndAwardBadges: (): void => {
    const moods = moodUtils.getAllMoods()
    const streaks = moodUtils.getStreaks()
    const currentBadges = moodUtils.getBadges()

    const newBadges = [...currentBadges]

    // First Step badge
    if (moods.length >= 1 && !newBadges.includes("First Step")) {
      newBadges.push("First Step")
    }

    // Week Warrior badge
    if (streaks.current >= 7 && !newBadges.includes("Week Warrior")) {
      newBadges.push("Week Warrior")
    }

    // Consistency Star badge
    if (streaks.current >= 30 && !newBadges.includes("Consistency Star")) {
      newBadges.push("Consistency Star")
    }

    // Calm Mind badge (for tracking calm moods)
    const calmMoods = moods.filter((mood) => mood.mood.toLowerCase() === "calm")
    if (calmMoods.length >= 5 && !newBadges.includes("Calm Mind")) {
      newBadges.push("Calm Mind")
    }

    // Mood Master badge
    if (moods.length >= 50 && !newBadges.includes("Mood Master")) {
      newBadges.push("Mood Master")
    }

    localStorage.setItem("neurocare_badges", JSON.stringify(newBadges))
  },

  getMoodStats: (moods: MoodEntry[]) => {
    if (moods.length === 0) return { mostCommon: "None", averageConfidence: 0 }

    const moodCounts: { [key: string]: number } = {}
    let totalConfidence = 0

    moods.forEach((mood) => {
      moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1
      totalConfidence += mood.confidence
    })

    const mostCommon = Object.keys(moodCounts).reduce((a, b) => (moodCounts[a] > moodCounts[b] ? a : b))

    return {
      mostCommon,
      averageConfidence: Math.round(totalConfidence / moods.length),
    }
  },
}
