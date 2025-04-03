export interface User {
  _id: string
  name: string
  email: string
  token: string
}

export interface MissingPerson {
  _id: string
  name: string
  age: number
  gender: string
  height: string
  weight: string
  hairColor: string
  eyeColor: string
  lastSeen: string
  location: string
  description: string
  contactInfo: string
  image?: string
  status: string
  reportedBy: string
  createdAt: string
  updatedAt: string
}

export interface FoundPerson {
  _id: string
  age: number
  gender: string
  height: string
  weight: string
  hairColor: string
  eyeColor: string
  foundDate: string
  location: string
  description: string
  contactInfo: string
  image?: string
  reportedBy: string
  createdAt: string
  updatedAt: string
}

export interface Notification {
  _id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

export interface Feedback {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

