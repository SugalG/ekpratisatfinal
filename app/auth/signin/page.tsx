"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import { SignInResponse } from "@/types/signin-response";

export default function SignIn() {
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      mobile: formData.mobile,
      password: formData.password,
    }) as SignInResponse;

    setLoading(false);

    if ("error" in response) {
      setError(response.error);
    } else if ("user" in response) {
      const user = response.user;
      console.log(user); // Debugging to ensure user info is correct
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/"); // Redirect to homepage for regular users
      }
    }
  };

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (session?.user) {
      // Redirect to homepage for regular users if already logged in
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center mt-5">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="98********"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                pattern="^\d{10}$"
                title="Number must be exactly 10 digits"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? <Loading /> : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
