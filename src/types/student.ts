export type StudentImages = {
  default: string
  alt: string
}

/** Raw graduate roster fields — maps to exit-review `PortfolioCard` via `mapStudentRecordsToPortfolioItems`. */
export type StudentRecord = {
  preferredName: string
  focusTags: string
  seniorQuote: string
  designStats: string
  goToFont: string
  currentlyInspiredBy: string
  currentlyCollecting: string
  rechargesWith: string
  favoriteColorHex: string
  myTools: string
  whatsPlaying: string
  whatsOnYourDesk: string
  linkedinLink: string
  images: StudentImages
  websiteLink: string
  quoteAttribution: string
}
