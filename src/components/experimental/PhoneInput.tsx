"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type ComponentProps, useState } from "react";

// fix numbers for persian strings, also add number keyboard layout for mobile autocomplete... add +98 support prefix
export default function PhoneInput({
  className,
  onChange,
  value: valueProp = "09",
  onValueChange,
  ...props
}: ComponentProps<typeof Input> & {
  value: string;
  onValueChange: (phone: number) => void;
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
        onValueChange(+inputValue.replaceAll(" ", ""));
      }}
      {...props}
    />
  );
}

/**
 * Formats phone number to improve readability
 *
 * only supports phone numbers that start with `09` or `+98`
 *
 * @example
 * 09217280272   => 0921 728 0272
 * +989217280272 => +98 921 728 0272
 */
function formatPhoneNumber(phone: string) {
  const cleaned = phone.replaceAll(" ", "");

  if (cleaned.startsWith("09")) {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  if (cleaned.startsWith("+98")) {
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 9)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    // For longer numbers, group remaining digits in 3s
    const countryCode = cleaned.slice(0, 3);
    const firstGroup = cleaned.slice(3, 6);
    const remaining = cleaned.slice(6, 9);
    // Group remaining digits in chunks of 3
    return `${countryCode} ${firstGroup} ${remaining} ${cleaned.slice(9)}`;
  }

  return cleaned;
}
