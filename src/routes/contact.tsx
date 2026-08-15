import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Youtube, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VOLTWRLD" },
      {
        name: "description",
        content: "Get in touch with VOLTWRLD for support, wholesale enquiries, team riding and press.",
      },
      { property: "og:title", content: "Contact — VOLTWRLD" },
      { property: "og:description", content: "Support, wholesale, team and press enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 sm:px-10 sm:pt-44">
      <p className="eyebrow">Contact</p>
      <h1 className="display-xl mt-4 text-5xl sm:text-8xl">Get in touch</h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "mailto:hello@voltwrld.com";
          }}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <Field label="Subject" name="subject" />
          <div>
            <label htmlFor="message" className="eyebrow">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground"
              placeholder="Tell us what you need"
            />
          </div>
          <button
            type="submit"
            className="w-fit text-[12px] font-bold uppercase tracking-[0.24em] text-foreground underline underline-offset-8 transition-opacity duration-300 hover:opacity-70"
          >
            Send message
          </button>
        </form>

        <div className="space-y-10 border-t border-border pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <div>
            <p className="eyebrow">General</p>
            <a href="mailto:hello@voltwrld.com" className="link-underline mt-3 block w-fit font-display text-xl uppercase">
              hello@voltwrld.com
            </a>
          </div>
          <div>
            <p className="eyebrow">Wholesale</p>
            <a href="mailto:wholesale@voltwrld.com" className="link-underline mt-3 block w-fit font-display text-xl uppercase">
              wholesale@voltwrld.com
            </a>
          </div>
          <div>
            <p className="eyebrow">Social</p>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-1 transition-opacity duration-300 hover:opacity-60">
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-1 transition-opacity duration-300 hover:opacity-60">
                <Youtube className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a href="mailto:hello@voltwrld.com" aria-label="Email" className="p-1 transition-opacity duration-300 hover:opacity-60">
                <Mail className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-foreground"
        placeholder={label}
      />
    </div>
  );
}
