export const en = {
  common: {
    brand: "Nimble Gravity",
  },
  emailStep: {
    title: "Nimble Gravity — Application",
    description:
      "Enter your email to see open positions and submit your application.",
    emailLabel: "Email",
    placeholder: "you@email.com",
    errorRequired: "Please enter your email.",
    errorInvalid: "Please enter a valid email.",
    loading: "Loading...",
    continue: "Continue",
    errorFetch: "Error fetching data.",
  },
  jobsStep: {
    back: "Back",
    greeting: "Hello, {{name}}",
    openPositions: "Open positions",
    searchLabel: "Search by position name",
    searchPlaceholder: "E.g. Fullstack, Chef...",
    noResults: "No positions match your search.",
    noPositions: "No positions available.",
    loadError: "Error loading positions.",
    retry: "Retry",
    prev: "Previous",
    next: "Next",
    pageOf: "Page {{current}} of {{total}}",
  },
  jobCard: {
    repoLabel: "Repository URL (GitHub)",
    repoPlaceholder: "https://github.com/your-username/your-repo",
    errorRequired: "Please enter the repository URL.",
    errorInvalidUrl:
      "Enter a valid GitHub URL (e.g. https://github.com/your-username/your-repo).",
    sending: "Sending...",
    submit: "Submit",
    sent: "Sent",
    successMessage: "Application submitted successfully.",
    errorSend: "Error sending.",
  },
} as const;
