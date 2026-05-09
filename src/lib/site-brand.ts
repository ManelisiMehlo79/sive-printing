/** Public URL for app mark PNG (matches header `CircularBrandLogo`). */
export const SITE_LOGO_SRC = "/transparent.png";

export const SITE_EMAIL = "Bysiveprintingservices@gmail.com";

function mailtoHref(subject: string) {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** Header & contact page — quote request preset subject */
export const SITE_QUOTE_MAILTO = mailtoHref("Quote request — BySive Printing");

/** Plain mailto without preset subject */
export const SITE_CONTACT_MAILTO = `mailto:${SITE_EMAIL}`;
