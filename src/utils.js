import { writable } from 'svelte/store'

export const isVisible = writable(false)

const observerOptions = {
  root: null,
  threshold: 0.5,
}

const observerCallback = ([entry]) =>
  entry.isIntersecting ? isVisible.set(true) : isVisible.set(false)

const observer = new window.IntersectionObserver(observerCallback, observerOptions)

export const viewportObserver = node => {
  observer.observe(node)

  return {
    destroy() {
      observer.unobserve(node)
    },
  }
}
