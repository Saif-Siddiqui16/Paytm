"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface typeProps {
  type: "register" | "login";
}

export const Form = ({ type }: typeProps) => {
  const router=useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    
    if (type === "register") {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
       if(result.ok){
        console.log("register successful")
       }

      } catch (error) {
        return Response.json(error);
      }
    }
    if (type === "login") {
      try {
        const response = await signIn("credentials", {
          ...data,
          redirect: false,
        });
      const result =await JSON.stringify(response)
router.push("/dashboard")
        console.log(result)
      } catch (error) {
        return Response.json(error);
      }
    }
  };

  return (
    <div className="bg-slate-300 h-[100vh] flex justify-center items-center">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {type === "register" && (
              <div className="flex gap-12">
                <label className="text-lg font-bold">Name</label>
                <input
                  className="px-2 py-1 border rounded-lg "
                  {...register("name", {
                    required: "name is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "Username must be at least 3 characters";
                      }
                    },
                  })}
                  type="text"
                  placeholder="name"
                />
              </div>
            )}

            <div className="flex gap-12">
              <label className="text-lg font-bold">Email</label>
              <input
                className="px-2 py-1 border rounded-lg "
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="email"
              />
            </div>
            <div className="flex gap-2">
              <label className="text-lg font-bold">Password</label>
              <input
                className="px-2 py-1 border rounded-lg "
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="password"
              />
            </div>
            <button
              className="bg-blue-500 py-2 border rounded-md text-white hover:bg-blue-400"
              type="submit"
            >
              {type==="register"?"Signup":"Login"

              }
            </button>
            {type ==="register"? (
              <div>
                <label>Already registered Please : <span><Link href="/login">Login</Link></span></label>
              </div>
            ):(
              <div>
 <label>Not registered : <span><Link href="/register">Register</Link></span></label>
              </div>
            )

            }
          </div>
        </form>
      </div>
    </div>
  );
};
