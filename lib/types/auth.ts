import { z } from "zod";
import { zfd } from "zod-form-data";

export const LoginSchema = zfd.formData({
  email: zfd.text(
    z
      .string({
        required_error: "Email address is required",
      })
      .email("Email address is invalid")
  ),
});
