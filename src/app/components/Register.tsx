import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const schema = z
  .object({
    fullname: z.string().min(3, "Full name is required."),
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long.")
      .regex(/\d/, "The password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "he password must contain at least one speacial character"),
    confirmPassword: z.string(),
    age: z.number().optional().refine((value) => value === undefined || value >= 18, {
      message: "You must be at least 18 years old",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    resetField,
    watch,
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: undefined,
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // Simulando o envio dos dados
    setTimeout(() => {
      console.log(data);
      toast.success("Registration successful!");
      navigate("/Store");
    }, 1000);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <section className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto flex justify-center rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold">Register</h1>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: "fullname", type: "text", placeholder: "FullName" },
            { name: "email", type: "email", placeholder: "Email" },
          ].map(({ name, type, placeholder }) => (
            <div key={name} className="relative">
              <input
                {...register(name as keyof FormFields)}
                type={type}
                placeholder={placeholder}
                aria-label={placeholder}
                className={`w-full px-4 py-2 border rounded ${errors[name as keyof FormFields] ? "border-red-500" : ""}`}
              />
              <span className="absolute right-2 top-2 cursor-pointer" onClick={() => resetField(name as keyof FormFields)}>
                <FiX />
              </span>
              {errors[name as keyof FormFields] && (
                <p className="text-red-500">{errors[name as keyof FormFields]?.message}</p>
              )}
            </div>
          ))}

          {/* Campo de Idade */}
          <div className="relative">
            <input
              {...register("age", { valueAsNumber: true })}
              type="number"
              placeholder="Age"
              aria-label="Age"
              className={`w-full px-4 py-2 border rounded ${errors.age ? "border-red-500" : ""}`}
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          {[{ name: "password", placeholder: "Password" }].map(({ name, placeholder }) => (
            <div key={name} className="relative">
              <input
                {...register(name as keyof FormFields)}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                aria-label={placeholder}
                className={`w-full px-4 py-2 border rounded pr-10 ${errors[name as keyof FormFields] ? "border-red-500" : ""}`}
              />
              <span className="absolute right-10 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors[name as keyof FormFields] && (
                <p className="text-red-500">{errors[name as keyof FormFields]?.message}</p>
              )}
            </div>
          ))}

          {/* Campo de Confirmação de Senha */}
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              aria-label="Confirm your password"
              className={`w-full px-4 py-2 border rounded pr-10 ${
                confirmPassword && confirmPassword !== password ? "border-red-500" : ""
              }`}
            />
            <span className="absolute right-10 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-500">The passwords not match</p>
            )}
          </div>

          <button
            disabled={!isValid || Object.keys(dirtyFields).length === 0 || isSubmitting}
            type="submit"
            className={`w-full py-2 px-4 text-white rounded ${
              !isValid || Object.keys(dirtyFields).length === 0 ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover />
      </div>
    </section>
  );
};

export default Register;