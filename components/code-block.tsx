'use client'

import React, { useMemo } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

interface Token {
  type: 'keyword' | 'number' | 'string' | 'comment' | 'operator' | 'text'
  value: string
}

function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  
  const keywords = ['function', 'if', 'else', 'for', 'while', 'return', 'def', 'class', 'import', 'from', 'as', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'ERROR', 'return', 'RESULT']
  
  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      let ws = ''
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i]
        i++
      }
      tokens.push({ type: 'text', value: ws })
      continue
    }
    
    // Comments
    if (code[i] === '#' || (code[i] === '/' && code[i + 1] === '/')) {
      let comment = ''
      while (i < code.length && code[i] !== '\n') {
        comment += code[i]
        i++
      }
      tokens.push({ type: 'comment', value: comment })
      continue
    }
    
    // Strings
    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const quote = code[i]
      let str = quote
      i++
      while (i < code.length && code[i] !== quote) {
        str += code[i]
        i++
      }
      if (i < code.length) {
        str += code[i]
        i++
      }
      tokens.push({ type: 'string', value: str })
      continue
    }
    
    // Numbers
    if (/\d/.test(code[i])) {
      let num = ''
      while (i < code.length && /[\d.]/.test(code[i])) {
        num += code[i]
        i++
      }
      tokens.push({ type: 'number', value: num })
      continue
    }
    
    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      let ident = ''
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        ident += code[i]
        i++
      }
      const type = keywords.includes(ident) ? 'keyword' : 'text'
      tokens.push({ type, value: ident })
      continue
    }
    
    // Operators and special characters
    if (/[=+\-*\/()[\]{}:.,;<>]/.test(code[i])) {
      tokens.push({ type: 'operator', value: code[i] })
      i++
      continue
    }
    
    // Default text
    tokens.push({ type: 'text', value: code[i] })
    i++
  }
  
  return tokens
}

export default function CodeBlock({ code, language = 'python', className = '' }: CodeBlockProps) {
  const tokens = useMemo(() => tokenizeCode(code), [code])
  
  const getTokenColor = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'text-blue-300'
      case 'number':
        return 'text-cyan-300'
      case 'string':
        return 'text-emerald-300'
      case 'comment':
        return 'text-gray-500'
      case 'operator':
        return 'text-yellow-300'
      default:
        return 'text-gray-100'
    }
  }

  return (
    <div className={`bg-gray-900 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b-2 border-black px-3 md:px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500"></div>
        </div>
        <span className="text-xs text-gray-400 ml-2 font-mono">{language}</span>
      </div>
      
      {/* Code Content */}
      <div className="p-3 md:p-6 font-mono text-xs md:text-sm text-gray-100 overflow-x-auto">
        <pre className="whitespace-pre-wrap break-words leading-relaxed">
          {tokens.map((token, idx) => (
            <span key={idx} className={getTokenColor(token.type)}>
              {token.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}
