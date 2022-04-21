// import App from './App.svelte'

// var app = new App({
//   target: document.body,
// })

// export default app

// import Youtube from './Youtube.svelte'

import Reviews from './Reviews.svelte'

export default function (target, props, anchor = null) {
  new Reviews({
    target,
    props,
    anchor,
  })
}
