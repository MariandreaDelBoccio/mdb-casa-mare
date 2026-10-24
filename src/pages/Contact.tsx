import { useState, type FormEvent } from "react";
import { PLACE } from "../data";
import { useI18n } from "../i18n";
import { isValidEmail } from "../lib";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

export function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = t.contact.errors.name;
    if (!isValidEmail(email)) next.email = t.contact.errors.email;
    if (!message.trim()) next.message = t.contact.errors.message;
    if (Object.keys(next).length) {
      next.form = t.contact.errors.form;
      setErrors(next);
      return;
    }
    setErrors({});
    setDone(true);
  };

  if (done) {
    return (
      <main className="page empty success">
        <p className="kicker">{t.contact.kicker}</p>
        <h1>{t.contact.successTitle}</h1>
        <p className="lead">{t.contact.successText}</p>
        <button
          type="button"
          className="btn terracotta"
          onClick={() => {
            setDone(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
        >
          {t.contact.another}
        </button>
      </main>
    );
  }

  return (
    <main className="page contact-page">
      <header className="page-hero">
        <p className="kicker">{t.contact.kicker}</p>
        <h1>{t.contact.title}</h1>
        <p className="lead">{t.contact.lead}</p>
      </header>
      <div className="split">
        <form className="form" onSubmit={onSubmit} noValidate>
          {errors.form ? <p className="form-banner">{errors.form}</p> : null}
          <label className={errors.name ? "invalid" : undefined}>
            <span>{t.contact.name}</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            {errors.name ? <em>{errors.name}</em> : null}
          </label>
          <label className={errors.email ? "invalid" : undefined}>
            <span>{t.contact.email}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {errors.email ? <em>{errors.email}</em> : null}
          </label>
          <label className={errors.message ? "invalid" : undefined}>
            <span>{t.contact.message}</span>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contact.messagePh}
            />
            {errors.message ? <em>{errors.message}</em> : null}
          </label>
          <button type="submit" className="btn terracotta">
            {t.contact.submit}
          </button>
        </form>
        <aside className="summary">
          <p className="wordmark small">CASA MARÉ</p>
          <p>{t.contact.address}</p>
          <p>
            <a href={`mailto:${PLACE.email}`}>{PLACE.email}</a>
          </p>
          <p>{PLACE.phone}</p>
          <p className="muted">{t.contact.hours}</p>
        </aside>
      </div>
    </main>
  );
}
