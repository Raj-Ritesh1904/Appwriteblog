import { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import parse from 'html-react-parser'

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [activeTab, setActiveTab] = useState("write") // "write" or "preview"
  const textareaRef = useRef(null)

  return (
    <div className='w-full flex flex-col gap-1.5'>
      {label && <label className='text-sm font-semibold text-slate-300 tracking-wide pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          const currentValue = value || ""

          const insertTag = (tagOpen, tagClose) => {
            const textarea = textareaRef.current
            if (!textarea) return

            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const text = textarea.value
            const selectedText = text.substring(start, end)
            const replacement = tagOpen + selectedText + tagClose

            onChange(text.substring(0, start) + replacement + text.substring(end))

            // Refocus and select the formatted text
            setTimeout(() => {
              textarea.focus()
              textarea.setSelectionRange(
                start + tagOpen.length,
                start + tagOpen.length + selectedText.length
              )
            }, 0)
          }

          return (
            <div className="w-full border border-slate-700/60 rounded-xl bg-slate-900/40 overflow-hidden flex flex-col min-h-[450px]">
              {/* Tab Header & Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-2 gap-2">
                {/* Tabs */}
                <div className="flex bg-slate-800/60 p-1 rounded-lg w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                      activeTab === "write"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Preview
                  </button>
                </div>

                {/* Toolbar - Only visible when typing */}
                {activeTab === "write" && (
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      title="Bold"
                      onClick={() => insertTag("<strong>", "</strong>")}
                      className="p-1.5 text-xs font-bold rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      title="Italic"
                      onClick={() => insertTag("<em>", "</em>")}
                      className="p-1.5 text-xs italic rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      title="Underline"
                      onClick={() => insertTag("<u>", "</u>")}
                      className="p-1.5 text-xs underline rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      U
                    </button>
                    <div className="w-px h-4 bg-slate-800 mx-1"></div>
                    <button
                      type="button"
                      title="Heading 1"
                      onClick={() => insertTag("<h1>", "</h1>")}
                      className="p-1.5 text-xs font-semibold rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer min-w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      title="Heading 2"
                      onClick={() => insertTag("<h2>", "</h2>")}
                      className="p-1.5 text-xs font-semibold rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer min-w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      H2
                    </button>
                    <div className="w-px h-4 bg-slate-800 mx-1"></div>
                    <button
                      type="button"
                      title="Blockquote"
                      onClick={() => insertTag("<blockquote>", "</blockquote>")}
                      className="p-1.5 text-xs rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      “
                    </button>
                    <button
                      type="button"
                      title="Code Block"
                      onClick={() => insertTag("<pre><code>", "</code></pre>")}
                      className="p-1.5 text-xs rounded font-mono text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      &lt;&gt;
                    </button>
                    <button
                      type="button"
                      title="Insert Link"
                      onClick={() => {
                        const url = prompt("Enter URL:", "https://")
                        if (url) insertTag(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, "</a>")
                      }}
                      className="p-1.5 text-xs rounded text-slate-300 hover:text-white hover:bg-slate-800/80 cursor-pointer w-7 h-7 flex items-center justify-center border border-transparent hover:border-slate-700"
                    >
                      🔗
                    </button>
                  </div>
                )}
              </div>

              {/* Editor Workspace */}
              <div className="flex-grow flex flex-col min-h-[400px]">
                {activeTab === "write" ? (
                  <textarea
                    ref={textareaRef}
                    value={currentValue}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write your article content here... (HTML tags like <strong>, <h1> are supported, or highlight text and click toolbar buttons to format)"
                    className="w-full flex-grow p-4 bg-transparent text-slate-100 placeholder-slate-500 outline-none resize-none font-sans text-base min-h-[400px]"
                  />
                ) : (
                  <div className="w-full flex-grow p-4 bg-slate-950/20 overflow-y-auto max-h-[500px] text-left browser-css">
                    {currentValue.trim() ? (
                      parse(currentValue)
                    ) : (
                      <p className="text-slate-500 italic">Nothing to preview yet. Go back to write tab to add content.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}