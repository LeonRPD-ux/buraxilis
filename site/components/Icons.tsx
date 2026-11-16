export function FeatureIcon({ name }: { name: string }) {
  const shared = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "exam":
      return (
        <svg {...shared}>
          <path d="M5 4.5h9.5L19 9v10.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1Z" />
          <path d="M14 4.5V9h5" />
          <path d="M8 13.5h6M8 17h4" />
        </svg>
      );
    case "block":
      return (
        <svg {...shared}>
          <rect x="4" y="4" width="7" height="7" rx="1.6" />
          <rect x="13" y="4" width="7" height="7" rx="1.6" />
          <rect x="4" y="13" width="7" height="7" rx="1.6" />
          <path d="M16.5 13.5v6M13.5 16.5h6" />
        </svg>
      );
    case "formula":
      return (
        <svg {...shared}>
          <path d="M17 5H7.5l5 7-5 7H17" />
          <path d="M7 12h5" />
        </svg>
      );
    case "brain":
      return (
        <svg {...shared}>
          <path d="M9.5 18h5M10.5 21h3" />
          <path d="M12 3a6 6 0 0 0-3.4 10.9c.3.2.4.5.4.9V18h6v-3.2c0-.4.1-.7.4-.9A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...shared}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-5M12 16V7M16 16v-8" />
        </svg>
      );
    case "offline":
      return (
        <svg {...shared}>
          <path d="M7.5 17.5h8.2a3.3 3.3 0 0 0 .6-6.5 5 5 0 0 0-8.6-2.4" />
          <path d="M4 20h16" />
          <path d="M3 3l18 18" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg className="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l7 2.5v5.5c0 4-3 7.2-7 9-4-1.8-7-5-7-9V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
