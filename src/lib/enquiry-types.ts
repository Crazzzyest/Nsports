/**
 * Delt mellom skjemaet i nettleseren og behandlingen på serveren.
 * Ligger i egen fil slik at klienten ikke drar med seg innholdsfilene.
 */

export type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "organisation"
  | "customerType"
  | "product"
  | "quantity"
  | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<EnquiryField, "required" | "invalidEmail">>;
  values: Partial<Record<EnquiryField, string>>;
};

export const emptyEnquiryState: EnquiryState = { status: "idle", errors: {}, values: {} };
