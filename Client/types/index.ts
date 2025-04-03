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
  lastSeen: string
  location: string
  description: string
  contactInfo: string
  reportedBy: string
  createdAt: string
  updatedAt: string
}

export interface FoundPerson {
  _id: string
  approximateAge?: number
  gender?: string
  foundDate: string
  location: string
  description: string
  contactInfo: string
  reportedBy: string
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  _id: string
  subject: string
  category: string
  message: string
  userId: string
  createdAt: string
}

export interface Notification {
  _id: string
  userId: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

