const SEGMENTS = [
  'Texas State University',
  'Communication Design',
  'Spring 2026 Exit Review',
] as const

export function MarqueeBanner() {
  const chunk = SEGMENTS.join('\u00a0\u00a0·\u00a0\u00a0')

  return (
    <div className="marquee-banner" role="presentation">
      <div className="marquee-banner__track">
        <div className="marquee-banner__content">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={`a-${i}`} className="marquee-banner__segment">
              {chunk}
            </p>
          ))}
        </div>
        <div className="marquee-banner__content" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={`b-${i}`} className="marquee-banner__segment">
              {chunk}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
