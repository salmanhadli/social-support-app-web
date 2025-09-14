// src/hooks/useCircularRevealTransition.jsx
import { useCallback } from 'react'

/**
 * A custom React hook that provides a function to perform a circular reveal
 * view transition while animating background color.
 * @returns {Function} A memoized function to trigger the transition.
 */
export function useCircularRevealTransition() {
  const transition = useCallback(async (event, updateCallback) => {
    if (!document.startViewTransition) {
      await updateCallback()
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(async () => {
      await updateCallback()
    })

    await transition.ready



    // Animate the content reveal on the new snapshot
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
        filter: ['blur(50px)', 'blur(0px)'],
        // mixBlendMode: ['plus-lighter', 'normal', 'normal'],
      },
      {
        duration: 800,
        easing: 'ease-in',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [])

  return transition
}
