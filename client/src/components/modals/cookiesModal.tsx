import CookieConsent from "react-cookie-consent";

export default function CookiesModal() {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="J'accepte"
        declineButtonText="Je refuse"
        enableDeclineButton
        onAccept={() => {
          console.log("Cookies acceptés");
        }}
        onDecline={() => {
          console.log("Cookies refusés");
        }}
        style={{ background: "rgb(0, 99, 138)" }}
        buttonStyle={{ background: "#4CAF50", color: "#ffffff" }}
      >
        Ce site utilise des cookies pour améliorer votre expérience utilisateur.
      </CookieConsent>
    </div>
  );
}
