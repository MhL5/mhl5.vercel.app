"use client";

import { type ComponentProps, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// fix numbers for persian strings, also add number keyboard layout for mobile autocomplete... add +98 support prefix
export default function PhoneInput({
  className,
  onChange,
  value: valueProp = "09",
  onValueChange,
  ...props
}: ComponentProps<typeof Input> & {
  value: string;
  onValueChange: (phone: string) => void;
}) {
  const [value, setValue] = useState(valueProp);

  return (
    <Input
      type="tel"
      value={value}
      className={cn(
        `${value.length > 1 ? "tracking-[0.15em]" : ""}`,
        className,
      )}
      autoComplete="tel"
      onChange={(e) => {
        onChange?.(e);
        const inputValue = e.target.value;

        const formattedValue = formatPhoneNumber(inputValue);
        setValue(formattedValue);
        onValueChange(inputValue.replaceAll(" ", ""));
      }}
      {...props}
    />
  );
}

// Format: 0999 782 9232 (4 digits, space, 3 digits, space, 4 digits)
function formatPhoneNumber(phone: string) {
  // Remove all existing spaces first
  const cleaned = phone.replaceAll(" ", "");

  // 0921 728 0272
  // bug it returns: +98 921 728 027 2
  if (cleaned.startsWith("09")) {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  // +98 921 728 0272
  if (cleaned.startsWith("+98")) {
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 9)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    // For longer numbers, group remaining digits in 3s
    const countryCode = cleaned.slice(0, 3);
    const firstGroup = cleaned.slice(3, 6);
    const remaining = cleaned.slice(6);
    // Group remaining digits in chunks of 3
    const grouped = remaining.match(/.{1,3}/g)?.join(" ") || remaining;
    return `${countryCode} ${firstGroup} ${grouped}`;
  }

  return cleaned;
}
