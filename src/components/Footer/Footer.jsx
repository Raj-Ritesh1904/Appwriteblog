import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full bg-[#0b0f19] border-t border-slate-800/60 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 flex flex-col justify-between">
            <div className="mb-4">
              <Logo />
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                A modern publishing space designed for developers, writers, and thinkers to share stories and ideas.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Scribe. All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Affiliate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate-400 hover:text-indigo-400 transition-colors" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer