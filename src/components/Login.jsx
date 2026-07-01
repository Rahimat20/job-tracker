import { useState } from 'react'

function Login({ goToSignup, goToApp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#E4E0D8] shadow-sm p-8 w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-[#1C2541] mb-1">Welcome back</h1>
        <p className="text-sm text-[#5C6784] mb-6">Log in to your Job Tracker</p>

        <div className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="border border-[#E4E0D8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-[#E4E0D8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]"
          />
        </div>

        <button
          type="button"
          onClick={goToApp}
          className="w-full py-2.5 text-sm font-semibold text-white rounded-lg mb-4"
          style={{ backgroundColor: "#1C2541" }}
        >
          Log In
        </button>

        <p className="text-center text-sm text-[#5C6784]">
          Don't have an account?{" "}
          <button
            onClick={goToSignup}
            className="text-[#5B7FBD] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login