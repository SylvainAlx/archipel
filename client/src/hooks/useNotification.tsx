import { useState, useEffect } from "react";

export interface NotificationOptionsExtended extends NotificationOptions {
  vibrate?: number[];
  actions?: Array<{ action: string; title: string }>;
}

const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );

  // Demander la permission dès le montage du composant
  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, [permission]);

  // Fonction pour afficher une notification
  const showNotification = (
    Atitre: string,
    Aoptions?: NotificationOptionsExtended,
  ) => {
    if (permission !== "granted") {
      console.warn("❌ Les notifications ne sont pas autorisées !");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.error("❌ Service Worker non supporté !");
      return;
    }

    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.showNotification(Atitre, Aoptions);
      })
      .catch((error) => {
        console.error(
          "❌ Erreur lors de l'affichage de la notification :",
          error,
        );
      });
  };

  return { permission, showNotification };
};

export default useNotification;
