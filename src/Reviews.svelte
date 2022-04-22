<script>
  import { fly } from 'svelte/transition'
  import { testimonials } from './testimonialsData.js'
  import Card from './Card.svelte'

  const SET_OF_CARDS = 3
  const DISTANCE = 800

  let testimonialNumber = 0
  let xOffset = null

  $: isMoreSetsOfCards = testimonialNumber < testimonials.length - SET_OF_CARDS
  $: isAtBeginning = testimonialNumber === 0

  const startAtTheBeginning = () => (testimonialNumber = 0)
  const startAtTheEnd = () => (testimonialNumber = testimonials.length - SET_OF_CARDS)
  const goBackOneSet = () => (testimonialNumber = testimonialNumber - SET_OF_CARDS)
  const goForwardOneSet = () => (testimonialNumber = testimonialNumber + SET_OF_CARDS)

  const goForward = () => {
    xOffset = DISTANCE
    isMoreSetsOfCards ? goForwardOneSet() : startAtTheBeginning()
  }

  const goBackward = () => {
    xOffset = DISTANCE * -1
    isAtBeginning ? startAtTheEnd() : goBackOneSet()
  }

  const handleClick = direction => (direction === 'next' ? goForward() : goBackward())
</script>

<div class="outer">
  <i class="fa fa-angle-left fa-3x" on:click={() => handleClick('prev')} />
  {#key testimonialNumber}
    <div class="inner" in:fly={{ x: xOffset }}>
      {#each Array(SET_OF_CARDS) as _, index}
        <Card testimonialNumber={testimonialNumber + index} />
      {/each}
    </div>
  {/key}
  <i class="fa fa-angle-right fa-3x" on:click={() => handleClick('next')} />
</div>

<style>
  :root {
    --primary: #6ac;
    --primary-dark: #269;
    --primary-light: #9de;
    --primary-light-trans: #9de9;
    --primary-contrast: #fff;
    --primary-accent: #75b;
    --primary-neutral: #888;
    --alt-one: #37a;
    --alt-two: #6a6;
    --primary-font: Nunito Sans;
  }
  .outer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    min-height: 150px;
    overflow: hidden;
  }
  .fa {
    padding: 2px;
    color: var(--primary-dark);
    cursor: pointer;
    transition: transform 200ms ease-in-out;
  }
  .fa:hover {
    transform: scale(1.2);
  }
</style>
