"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run this on the home page
    if (pathname !== "/") return

    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Get the element ID from the hash
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)

      // If the element exists, scroll to it after a short delay
      // The delay ensures the page has fully loaded
      if (element) {
        setTimeout(() => {
          // Get the header height to offset the scroll position
          const headerHeight = document.querySelector("header")?.offsetHeight || 0

          // Calculate the element's position relative to the viewport
          const elementPosition = element.getBoundingClientRect().top

          // Calculate the absolute position by adding the current scroll position
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight

          // Scroll to the element with the calculated offset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }, 100)
      }
    }
  }, [pathname])

  return null
}
