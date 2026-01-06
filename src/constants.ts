export const GITHUB_REPO_URL = "https://github.com/MhL5/mhl5.vercel.app";

export const CONTACT_INFO = {
  telegram: `https://t.me/mhl_5`,
  discord: "https://discord.com/users/649998586154844160",
  github: "https://github.com/MhL5",
} as const;

export function CONTACT_SUPPORT_LINK(text?: string) {
  const supportUrl = new URL(CONTACT_INFO.telegram);
  if (text) supportUrl.searchParams.append("text", text);
  return supportUrl.href;
}
