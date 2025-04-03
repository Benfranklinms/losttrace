"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Notification } from "@/types"

export default function Notifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch notifications")
        }

        setNotifications(data)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch notifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = async (id: string) => {
    if (!user) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark notification as read")
      }

      setNotifications((prev) =>
        prev.map((notification) => (notification._id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to mark notification as read")
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read-all`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark all notifications as read")
      }

      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

      toast.success("All notifications marked as read")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to mark all notifications as read")
    }
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-xl mb-4">You need to be logged in to view notifications</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && <Button onClick={markAllAsRead}>Mark All as Read</Button>}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification._id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>{notification.type}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="mb-2">{notification.message}</p>
                {!notification.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(notification._id)}>
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No notifications</p>
        </div>
      )}
    </div>
  )
}

