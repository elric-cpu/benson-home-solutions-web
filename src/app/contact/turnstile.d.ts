interface Turnstile {
  render: (
    element: string | HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

export interface WindowWithTurnstile extends Window {
  turnstile?: Turnstile;
}
