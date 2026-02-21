// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Hammer, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
      {/* Grid decorativo */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(184,92,44,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(184,92,44,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#b85c2c] mb-4">
            <Hammer className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-2xl text-[#e8e0d5]">PANEL ADMIN</h1>
          <p className="text-[#a89a8a] text-sm mt-1">Muebles Industriales</p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 bg-red-950/30 border border-red-900/50 text-red-400 text-sm p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="font-display text-xs text-[#a89a8a] tracking-widest block mb-2">
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a4a]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0e0e0e] border border-[#2a2a2a] text-[#e8e0d5] text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#b85c2c] transition-colors"
                  placeholder="admin@mueblesind.com"
                />
              </div>
            </div>

            <div>
              <label className="font-display text-xs text-[#a89a8a] tracking-widest block mb-2">
                CONTRASEÑA
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a4a]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0e0e0e] border border-[#2a2a2a] text-[#e8e0d5] text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#b85c2c] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b85c2c] hover:bg-[#d4703a] disabled:bg-[#2a2a2a] disabled:text-[#4a4a4a] text-white font-display text-sm tracking-widest py-3.5 transition-colors duration-200 mt-2"
            >
              {loading ? "VERIFICANDO..." : "INGRESAR"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#4a4a4a] text-xs mt-6">
          <a href="/" className="hover:text-[#a89a8a] transition-colors">
            ← Volver al catálogo
          </a>
        </p>
      </div>
    </div>
  );
}
