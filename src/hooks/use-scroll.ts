"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useScroll() {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = useCallback(
    (elementId: string) => {
      // Remove the # if it's included
      const id = elementId.startsWith("#") ? elementId.substring(1) : elementId

      // Check if we're already on the home page
      if (pathname === "/") {
        // If we're on the home page, just scroll to the section
        const element = document.getElementById(id)
        if (element) {
          // Get the header height to offset the scroll position
          const headerHeight = document.querySelector("header")?.offsetHeight || 0

          // Calculate the element's position relative to the viewport
          const elementPosition = element.getBoundingClientRect().top

          // Calculate the absolute position by adding the current scroll position
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 40

          // Scroll to the element with the calculated offset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })

          // Update URL without causing a page reload
          window.history.pushState({}, "", `#${id}`)
        }
      } else {
        // If we're not on the home page, navigate to home page with the hash
        router.push(`/#${id}`)
      }
    },
    [pathname, router],
  )

  const scrollToTop = useCallback(() => {
    if (pathname === "/") {
      // If we're on the home page, just scroll to the top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      // Update URL without the hash
      window.history.pushState({}, "", pathname)
    } else {
      // If we're not on the home page, navigate to home page
      router.push("/")
    }
  }, [pathname, router])

  return { scrollToSection, scrollToTop }
}
