import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { submitApplication } from "../services/pilotApplication";
import { Button } from "./ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "./ui/Field";
import { Section, SectionHeader } from "./ui/Section";

type FormValues = {
  name: string;
  email: string;
  street: string;
  houseNumber: string;
  postcode: string;
  households: string;
  message: string;
  consent: boolean;
};

type ErrorKey = "required" | "email" | "postcode" | "consent";
type Errors = Partial<Record<keyof FormValues, ErrorKey>>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: FormValues = {
  name: "",
  email: "",
  street: "",
  houseNumber: "",
  postcode: "",
  households: "",
  message: "",
  consent: false,
};

const POSTCODE = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "required";
  if (!v.email.trim()) e.email = "required";
  else if (!EMAIL.test(v.email.trim())) e.email = "email";
  if (!v.street.trim()) e.street = "required";
  if (!v.houseNumber.trim()) e.houseNumber = "required";
  if (!v.postcode.trim()) e.postcode = "required";
  else if (!POSTCODE.test(v.postcode.trim())) e.postcode = "postcode";
  if (!v.households) e.households = "required";
  if (!v.consent) e.consent = "consent";
  return e;
}

function normalisePostcode(value: string) {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  return compact.length === 6 ? `${compact.slice(0, 4)} ${compact.slice(4)}` : value.trim();
}

export function PilotApplication() {
  const { t, locale } = useLanguage();
  const a = t.apply;
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const err = (key: keyof FormValues) => (errors[key] ? a.errors[errors[key]] : undefined);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setValues((v) => ({ ...v, [name]: next }));
    if (errors[name as keyof FormValues]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await submitApplication({
        name: values.name.trim(),
        email: values.email.trim(),
        street: values.street.trim(),
        houseNumber: values.houseNumber.trim(),
        postcode: normalisePostcode(values.postcode),
        households: values.households,
        message: values.message.trim() || undefined,
        consent: values.consent,
        locale,
      });
      setStatus("success");
      setValues(empty);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="apply" tone="green" labelledBy="apply-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader id="apply-title" title={a.title} tone="dark" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-cream/80">
            {a.lead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-3 border-t border-cream/15 pt-8">
            {a.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-cream/90">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-cream p-6 text-ink sm:p-10">
            {status === "success" ? (
              <div ref={successRef} tabIndex={-1} role="status" className="py-10 text-center outline-none sm:py-16">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-bollard text-cream">
                  <Check className="size-8" strokeWidth={2.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-3xl font-bold text-amsterdam-purple-brown">{a.success.title}</h3>
                <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-ink-soft">{a.success.text}</p>
                <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
                  {a.success.again}
                </Button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-6">
                <Field id="name" label={a.fields.name} error={err("name")} className="sm:col-span-3">
                  <TextInput id="name" name="name" autoComplete="name" placeholder={a.placeholders.name} value={values.name} onChange={onChange} error={err("name")} />
                </Field>
                <Field id="email" label={a.fields.email} error={err("email")} className="sm:col-span-3">
                  <TextInput id="email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={a.placeholders.email} value={values.email} onChange={onChange} error={err("email")} />
                </Field>
                <Field id="street" label={a.fields.street} error={err("street")} className="sm:col-span-4">
                  <TextInput id="street" name="street" required autoComplete="address-line1" placeholder={a.placeholders.street} value={values.street} onChange={onChange} error={err("street")} />
                </Field>
                <Field id="houseNumber" label={a.fields.houseNumber} error={err("houseNumber")} className="sm:col-span-2">
                  <TextInput id="houseNumber" name="houseNumber" required autoComplete="address-line2" placeholder={a.placeholders.houseNumber} value={values.houseNumber} onChange={onChange} error={err("houseNumber")} />
                </Field>
                <Field id="postcode" label={a.fields.postcode} error={err("postcode")} className="sm:col-span-2">
                  <TextInput id="postcode" name="postcode" required autoComplete="postal-code" placeholder={a.placeholders.postcode} value={values.postcode} onChange={onChange} onBlur={() => setValues((v) => ({ ...v, postcode: normalisePostcode(v.postcode) }))} error={err("postcode")} />
                </Field>
                <Field id="households" label={a.fields.households} error={err("households")} className="sm:col-span-4">
                  <SelectInput id="households" name="households" required value={values.households} onChange={onChange} error={err("households")}>
                    <option value="" disabled>
                      {a.placeholders.select}
                    </option>
                    {a.households.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </SelectInput>
                </Field>
                <Field id="message" label={a.fields.message} optionalLabel={a.fields.optional} className="sm:col-span-6">
                  <TextArea id="message" name="message" rows={3} placeholder={a.placeholders.message} value={values.message} onChange={onChange} />
                </Field>

                <div className="sm:col-span-6">
                  <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={onChange}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-bollard"
                    />
                    {a.fields.consent}
                  </label>
                  {errors.consent && (
                    <p id="consent-error" className="mt-2 text-sm font-medium text-brick">
                      {a.errors.consent}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:col-span-6 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
                    {status === "submitting" ? a.submitting : a.submit}
                    {status !== "submitting" && <ArrowRight className="size-4" aria-hidden />}
                  </Button>
                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-brick">
                      {a.errors.submit}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
