import { writable } from 'svelte/store'

export const isVisible = writable(false)

export const observeAction = node => {
  const observer = new window.IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? isVisible.set(true) : isVisible.set(false)),
    {
      root: null,
      threshold: 0.5, // set offset 0.1 means trigger if at least 10% of element in viewport
    }
  )
  observer.observe(node)
}
