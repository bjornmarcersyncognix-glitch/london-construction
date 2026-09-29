/** Enquiry form schema — shared by the client form and the API route. */

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const LIMITS = { name: 120, email: 200, phone: 40, projectType: 80, location: 120, message: 4000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,}$/;

export function normalise(raw: Record<string, unknown>): EnquiryInput {
  const get = (k: keyof EnquiryInput) => String(raw[k] ?? "").trim().slice(0, LIMITS[k]);
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    projectType: get("projectType"),
    location: get("location"),
    message: get("message"),
  };
}

export function validate(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name) e.name = "Please enter your name.";
  if (!v.email) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email)) e.email = "Please enter a valid email address, like name@example.com.";
  if (v.phone && !PHONE.test(v.phone)) e.phone = "Please enter a valid phone number, or leave this blank.";
  if (!v.message) e.message = "Please tell us a little about your project.";
  else if (v.message.length < 10) e.message = "Please add a little more detail about your project.";
  return e;
}
