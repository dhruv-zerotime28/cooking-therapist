"use client";

import { useState } from "react";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormLabel,
} from "@/components/ui/form";

type FieldType = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
};

interface AuthFormProps<T extends FieldValues> {
  title: string;
  subtitle: string;
  fields: FieldType[];
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  forgotPasswordLink?: string;
  submitText: string;
}

export function CommonAuthForm<T extends FieldValues>({
  title,
  subtitle,
  fields,
  schema,
  onSubmit,
  defaultValues,
  forgotPasswordLink,
  submitText,
}: AuthFormProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form;

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
    reset(); 
  };
  return (
    <Form {...form}>
      <form className="p-6 md:p-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-6">
          {/* Title & Subtitle */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            <p className="text-balance text-muted-foreground">{subtitle}</p>
          </div>

          {/* Dynamic Fields */}
          {fields.map((field) => (
            <div className="grid gap-2" key={field.name}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                  placeholder={field.placeholder}
                  {...register(field.name as any)}
                  className={field.type === "password" ? "pr-10" : ""}
                />
                {field.type === "password" && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                )}
              </div>
              {errors[field.name] && (
                <p className="text-destructive text-sm mt-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}
          
          {/* Forgot Password Link */}
          {forgotPasswordLink && (
            
            <Link
              href={forgotPasswordLink}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={!isValid} className="w-full">
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
