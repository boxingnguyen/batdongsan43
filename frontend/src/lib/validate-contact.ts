// Số điện thoại VN: bắt đầu bằng 0 hoặc +84, theo sau 9–10 chữ số.
const PHONE_REGEX = /^(0|\+84)(\d{9,10})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFields {
  name?: string;
  phone?: string;
  email?: string;
}

type Locale = "vi" | "en";

const MESSAGES = {
  vi: {
    name: "Vui lòng nhập họ và tên",
    either: "Vui lòng nhập số điện thoại hoặc email",
    phone: "Số điện thoại không hợp lệ",
    email: "Email không hợp lệ",
  },
  en: {
    name: "Please enter your name",
    either: "Please enter a phone number or email",
    phone: "Invalid phone number",
    email: "Invalid email address",
  },
} as const;

/**
 * Validate a contact form: name required, at least one of phone/email required,
 * and each provided field must match its format.
 * Returns a localized error message or null when valid.
 *
 * Pass `requireName: false` for forms where name is optional.
 */
export function validateContact(
  { name = "", phone = "", email = "" }: ContactFields,
  options: { locale?: Locale; requireName?: boolean } = {}
): string | null {
  const { locale = "vi", requireName = true } = options;
  const msg = MESSAGES[locale];

  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedEmail = email.trim();

  if (requireName && !trimmedName) {
    return msg.name;
  }

  if (!trimmedPhone && !trimmedEmail) {
    return msg.either;
  }

  // Số điện thoại VN không chứa khoảng trắng/dấu; loại bỏ trước khi kiểm tra.
  if (trimmedPhone && !PHONE_REGEX.test(trimmedPhone.replace(/[\s.]/g, ""))) {
    return msg.phone;
  }

  if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
    return msg.email;
  }

  return null;
}
