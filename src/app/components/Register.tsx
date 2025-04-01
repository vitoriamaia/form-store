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
    fullname: z.string().min(3, "Nome completo é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/\d/, "A senha deve conter pelo menos um número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
    age: z.number().optional().refine((value) => value === undefined || value >= 18, {
      message: "Você deve ter pelo menos 18 anos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
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
      toast.success("Cadastro realizado com sucesso!");
      navigate("/Store");
    }, 1000);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <section className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto flex justify-center rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold">Registro</h1>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: "fullname", type: "text", placeholder: "Nome Completo" },
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
              placeholder="Idade"
              aria-label="Idade"
              className={`w-full px-4 py-2 border rounded ${errors.age ? "border-red-500" : ""}`}
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          {[{ name: "password", placeholder: "Senha" }].map(({ name, placeholder }) => (
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
              placeholder="Confirme sua senha"
              aria-label="Confirme sua senha"
              className={`w-full px-4 py-2 border rounded pr-10 ${
                confirmPassword && confirmPassword !== password ? "border-red-500" : ""
              }`}
            />
            <span className="absolute right-10 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-500">As senhas não coincidem</p>
            )}
          </div>

          <button
            disabled={!isValid || Object.keys(dirtyFields).length === 0 || isSubmitting}
            type="submit"
            className={`w-full py-2 px-4 text-white rounded ${
              !isValid || Object.keys(dirtyFields).length === 0 ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover />
      </div>
    </section>
  );
};

export default Register;