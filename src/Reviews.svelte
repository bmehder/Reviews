<script>
  import { fly } from 'svelte/transition'
  import { testimonials } from './testimonialsData.js'
  import Card from './Card.svelte'

  const NUMBER_OF_CARDS = 3

  let testimonialNumber = 0
  let xOffest = 800

  $: isAtLeastThreeTestimonialsRemaining = testimonialNumber < testimonials.length - NUMBER_OF_CARDS
  $: isGreaterThanFirstTestimonial = testimonialNumber > 0

  const goForward = () => {
    xOffest = 800
    isAtLeastThreeTestimonialsRemaining
      ? (testimonialNumber += NUMBER_OF_CARDS)
      : (testimonialNumber = 0)
  }

  const goBackward = () => {
    xOffest = -800
    isGreaterThanFirstTestimonial
      ? (testimonialNumber -= NUMBER_OF_CARDS)
      : (testimonialNumber = testimonials.length - NUMBER_OF_CARDS)
  }

  const handleClick = direction => (direction === 'forward' ? goForward() : goBackward())
</script>

<div class="outer">
  <i class="fa fa-angle-left fa-3x" on:click={handleClick} />
  {#key testimonialNumber}
    <div class="inner" in:fly={{ x: xOffest }}>
      {#each Array(NUMBER_OF_CARDS) as _, index}
        <Card testimonialNumber={testimonialNumber + index} />
      {/each}
    </div>
  {/key}
  <i class="fa fa-angle-right fa-3x" on:click={() => handleClick('forward')} />
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
