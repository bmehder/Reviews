import Reviews from './Reviews.svelte'

export default function (target, props, anchor = null) {
  new Reviews({
    target,
    props,
    anchor,
  })
}
