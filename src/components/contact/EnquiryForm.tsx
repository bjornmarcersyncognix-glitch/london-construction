"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ArrowRight, PhoneIcon } from "@/components/ui/icons";
import { LIMITS, normalise, validate, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";
import { projectTypes } from "@/content/services";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const empty: EnquiryInput = { name: "", email: "", phone: "", projectType: "", location: "", message: "" };

export function EnquiryForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const [values, setValues] = useState<EnquiryInput>({
    ...empty,
    projectType: preset && projectTypes.includes(preset) ? preset : "",
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const set = (k: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = normalise(values as unknown as Record<string, unknown>);
    const found = validate(data);
    setErrors(found);
    setServerError("");
    if (Object.keys(found).length) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        setValues(empty);
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error || "Sorry, something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerError(`We couldn't reach the server. Please check your connection, or call us on ${site.phone.display}.`);
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-line bg-surface p-8 outline-none md:p-12">
        <span className="flex h-12 w-12 items-center justify-center bg-success text-white" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2" /></svg>
        </span>
        <h3 className="t-h3 mt-6">Thank you — your enquiry has been sent.</h3>
        <p className="mt-3 max-w-md text-slate">
          We will be in touch to discuss your project. If it is urgent, you can call us on{" "}
          <a href={site.phone.href} className="link-inline tabular font-semibold text-ink">
            {site.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-text mt-6">
          Send another enquiry <ArrowRight />
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof EnquiryInput, string][];
  const fieldId = (k: string) => `${uid}-${k}`;
  const describedBy = (k: keyof EnquiryInput, hint?: boolean) =>
    [hint ? `${fieldId(k)}-hint` : "", errors[k] ? `${fieldId(k)}-error` : ""].filter(Boolean).join(" ") || undefined;

  const fieldError = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`${fieldId(k)}-error`} className="mt-2 flex items-start gap-2 t-small text-error">
        <svg className="mt-[3px] shrink-0" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 3.5v4.5M7 9.5v1.2" stroke="currentColor" strokeWidth="1.5" /></svg>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-req`} className="relative">
      {(errorList.length > 0 || serverError) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 border-l-2 border-error bg-[#fbeeec] p-5 outline-none">
          {serverError ? (
            <>
              <p className="font-semibold text-error">{serverError}</p>
              {errorList.length === 0 && (
                <a href={site.phone.href} className="btn-text mt-2 text-ink">
                  <PhoneIcon /> Call {site.phone.display}
                </a>
              )}
            </>
          ) : (
            <p className="font-semibold text-error">Please check the highlighted fields.</p>
          )}
          {errorList.length > 0 && (
            <ul className="mt-2 space-y-1">
              {errorList.map(([k, msg]) => (
                <li key={k}>
                  <a href={`#${fieldId(k)}`} className="link-inline t-small text-ink">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p id={`${uid}-req`} className="mb-6 t-small text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="field-label">
            Name <span aria-hidden="true" className="text-brick">*</span>
          </label>
          <input id={fieldId("name")} name="name" autoComplete="name" className="field" value={values.name} onChange={set("name")} maxLength={LIMITS.name} required aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="field-label">
            Email <span aria-hidden="true" className="text-brick">*</span>
          </label>
          <input id={fieldId("email")} name="email" type="email" inputMode="email" autoComplete="email" className="field" value={values.email} onChange={set("email")} maxLength={LIMITS.email} required aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor={fieldId("phone")} className="field-label">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={fieldId("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={values.phone} onChange={set("phone")} maxLength={LIMITS.phone} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
          {fieldError("phone")}
        </div>
        <div>
          <label htmlFor={fieldId("projectType")} className="field-label">
            Project type <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id={fieldId("projectType")} name="projectType" className="field" value={values.projectType} onChange={set("projectType")}>
            <option value="">Select a type of work</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={fieldId("location")} className="field-label">
            Project location <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={fieldId("location")} name="location" autoComplete="postal-code" className="field" value={values.location} onChange={set("location")} maxLength={LIMITS.location} aria-describedby={`${fieldId("location")}-hint`} />
          <p id={`${fieldId("location")}-hint`} className="mt-2 t-small text-muted">
            Town or postcode — this helps us confirm whether we can take the project on.
          </p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={fieldId("message")} className="field-label">
            About your project <span aria-hidden="true" className="text-brick">*</span>
          </label>
          <textarea id={fieldId("message")} name="message" className="field" rows={6} value={values.message} onChange={set("message")} maxLength={LIMITS.message} required aria-invalid={!!errors.message} aria-describedby={describedBy("message", true)} />
          <p id={`${fieldId("message")}-hint`} className="mt-2 t-small text-muted">
            What you would like to do, the type of property, and any timings or drawings you already have.
          </p>
          {fieldError("message")}
        </div>
      </div>

      {/* Honeypot — hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md t-small text-muted">
          We use your details only to respond to your enquiry. See our{" "}
          <Link href="/privacy" className="link-inline text-slate">
            privacy notice
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-primary min-w-[13rem]" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
                <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Enquiry <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
