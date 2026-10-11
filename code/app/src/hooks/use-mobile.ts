import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

/** How wide an element actually is, kept current as it or the window changes.
 *
 *  For a layout that decides from the room it has rather than from the size of
 *  the screen: the panes inside a page have to fit next to whatever else is on
 *  it — a sidebar that can be collapsed, for one — and a media query cannot see
 *  any of that. Null until it has been measured, so a caller can tell "not yet"
 *  from "narrow".
 */
export function useElementWidth(
  ref: React.RefObject<HTMLElement | null>
): number | null {
  const [width, setWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observer.observe(element)
    setWidth(element.getBoundingClientRect().width)
    return () => observer.disconnect()
  }, [ref])

  return width
}
