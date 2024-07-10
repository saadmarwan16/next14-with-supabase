import { z } from "zod";
import { zfd } from "zod-form-data";

export const LoginSchema = zfd.formData({
  email: zfd.text(z.string().email("Invalid email address")),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters long")
  ),
});

export const SignUpSchema = zfd.formData({
  email: zfd.text(z.string().email("Invalid email address")),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters long")
  ),
});
