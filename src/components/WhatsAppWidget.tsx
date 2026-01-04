import { useMemo, useState } from "react";

const whatsappPhone = "254759436196";
const whatsappMessage =
  "Hi Mashdata, I'd like to learn more about your data analytics services.";

export default function WhatsAppWidget() {
  const [isHidden, setIsHidden] = useState(false);
  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(whatsappMessage);
    return `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${message}`;
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <div className="qlwapp">
      <div className="qlwapp__container qlwapp__container--bottom-right qlwapp__container--rounded">
        <button
          type="button"
          className="qlwapp__button qlwapp__button--bubble"
          onClick={() => window.open(whatsappHref, "_blank", "noopener,noreferrer")}
        >
          <span className="qlwapp__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path d="M19.11 17.43c-.26-.13-1.52-.75-1.75-.83-.23-.08-.4-.13-.57.13-.17.26-.65.83-.8 1-.15.17-.3.2-.56.07-.26-.13-1.1-.41-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.08-.17.04-.32-.02-.45-.07-.13-.57-1.38-.79-1.89-.21-.51-.42-.44-.57-.44h-.49c-.17 0-.45.06-.68.32-.23.26-.89.87-.89 2.13 0 1.26.92 2.48 1.05 2.65.13.17 1.8 2.75 4.36 3.86 2.56 1.11 2.56.74 3.02.7.45-.04 1.52-.62 1.74-1.22.21-.6.21-1.12.15-1.22-.06-.1-.23-.16-.49-.29z" />
              <path d="M16.03 3C8.84 3 3 8.84 3 16.03c0 2.54.75 5.03 2.16 7.16L3 29l5.96-2.13c2.06 1.12 4.4 1.72 6.83 1.72 7.19 0 13.03-5.84 13.03-13.03C28.82 8.84 23.22 3 16.03 3zm0 23.7c-2.2 0-4.35-.62-6.2-1.79l-.44-.27-3.52 1.26 1.17-3.63-.29-.47A11.6 11.6 0 0 1 4.44 16c0-6.39 5.2-11.59 11.59-11.59 6.39 0 11.59 5.2 11.59 11.59 0 6.39-5.2 11.7-11.59 11.7z" />
            </svg>
          </span>
          <span className="qlwapp__text">How can we help you?</span>
          <span
            className="qlwapp__close"
            role="button"
            tabIndex={0}
            aria-label="Hide WhatsApp chat"
            onClick={(event) => {
              event.stopPropagation();
              setIsHidden(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsHidden(true);
              }
            }}
          >
            ×
          </span>
        </button>
      </div>
    </div>
  );
}
