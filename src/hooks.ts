import { useEffect } from "react";
import { subscribeWebPushNotifications } from "./client";

const PUBLIC_KEY =
  import.meta.env.REACT_APP_WEB_PUSH_NOTIFICATION_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const useWebPushNotifications = () => {
  const url = "http://127.0.0.1:8000/subscribe";

  const subscribeWebPush = async () => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      await Notification.requestPermission();
    }

    if (Notification.permission === "denied") {
      console.log("Notification permission denied");
      return;
    }

    const swRegistration = await navigator.serviceWorker.ready;
    const subscription = await swRegistration.pushManager.getSubscription();

    if (!subscription) {
      console.log("Not subscribed yet, subscribing");
      const newSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
      });

      await subscribeWebPushNotifications(url, newSubscription.toJSON());
    }

    console.log("Already subscribed");
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("Service worker is not available");
      return;
    }

    subscribeWebPush();
  }, []);
};
