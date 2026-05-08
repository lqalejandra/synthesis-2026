type SidebarFilterProps = {
  /** Filter labels (e.g. Branding, Publication). */
  options: readonly string[]
  selected: readonly string[]
  onToggle: (label: string) => void
  onClear: () => void
  /** Mobile drawer / overlay: layout + visibility overrides. */
  variant?: 'sidebar' | 'drawer'
  /** When false, hide the large “meet the designers” line (e.g. full-screen filter overlay). */
  showMeetHeading?: boolean
  /** Optional id for the “Filters” heading (e.g. dialog aria-labelledby). */
  filtersHeadingId?: string
  /** When set, show a dismiss control next to Clear (e.g. full-screen overlay). */
  onRequestClose?: () => void
}

export function SidebarFilter({
  options,
  selected,
  onToggle,
  onClear,
  variant = 'sidebar',
  showMeetHeading = true,
  filtersHeadingId,
  onRequestClose,
}: SidebarFilterProps) {
  const selectedSet = new Set(selected)
  const hasFilters = selected.length > 0
  const activeClass = 'wft wfp'
  const inactiveClass = 'wft'
  const colorClassForIndex = (idx: number) => `wfc${idx % 3}`

  return (
    <aside
      className={[
        'sidebar-filter',
        variant === 'drawer' ? 'sidebar-filter--drawer' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Filter by discipline"
    >
      {showMeetHeading ? (
        <p className="sidebar-filter__display">meet the designers</p>
      ) : null}
      <div
        className={[
          'sidebar-filter__header',
          variant === 'drawer' ? 'sidebar-filter__header--drawer' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <h2
          id={filtersHeadingId}
          className="sidebar-filter__header-title"
        >
          Filters
        </h2>
        <div className="sidebar-filter__header-actions">
          <button
            type="button"
            className="sidebar-filter__clear"
            onClick={onClear}
            disabled={!hasFilters}
          >
            Clear
          </button>
          {onRequestClose ? (
            <button
              type="button"
              className="sidebar-filter__dismiss"
              onClick={onRequestClose}
              aria-label="Close filters"
            >
              <span aria-hidden>×</span>
            </button>
          ) : null}
        </div>
      </div>
      <div
        className={[
          'sidebar-filter__box',
          variant === 'drawer' ? 'sidebar-filter__box--drawer' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className={[
            'sidebar-filter__row',
            variant === 'drawer' ? 'sidebar-filter__row--drawer' : '',
            inactiveClass,
            colorClassForIndex(0),
            !hasFilters ? 'is-active' : '',
            !hasFilters ? activeClass : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={!hasFilters}
          onClick={onClear}
        >
          All
        </button>
        {options.map((label, idx) => (
          <button
            key={label}
            type="button"
            className={[
              'sidebar-filter__row',
              variant === 'drawer' ? 'sidebar-filter__row--drawer' : '',
              selectedSet.has(label) ? 'is-active' : '',
              inactiveClass,
              colorClassForIndex(idx + 1),
              selectedSet.has(label) ? activeClass : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={selectedSet.has(label)}
            onClick={() => onToggle(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </aside>
  )
}
