import { SITE, FORMS } from "../config";

// Sends a form. With a Web3Forms access key (config.js → FORMS.web3formsKey) the
// message goes straight to your inbox. Without one it falls back to opening the
// visitor's email app with everything filled in.
// Returns "sent", "mailto" or throws on failure.
export const sendForm = async (subject, fields) => {
  if (FORMS.web3formsKey) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: FORMS.web3formsKey,
        subject,
        from_name: `${SITE.name} website`,
        replyto: fields.Email || undefined,
        botcheck: "",
        ...fields,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) throw new Error(data.message || "Could not send");
    return "sent";
  }

  const body = Object.entries(fields)
    .map(([k, v]) => (k === "Message" ? `\n${v}` : `${k}: ${v}`))
    .join("\n");
  const cc = SITE.ccEmail ? `cc=${encodeURIComponent(SITE.ccEmail)}&` : "";
  window.location.href = `mailto:${SITE.email}?${cc}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mailto";
};
