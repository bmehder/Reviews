<script>
  import Card from './Card.svelte'
  import { testimonials } from './testimonialsData.js'

  let testimonialNum = 0
  let xOffest = 800

  const goForward = () => {
    xOffest = 800
    testimonialNum < testimonials.length - 3 ? (testimonialNum += 3) : (testimonialNum = 0)
  }

  const goBack = () => {
    xOffest = -800
    testimonialNum > 0 ? (testimonialNum -= 3) : (testimonialNum = testimonials.length - 3)
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</svelte:head>

<section>
  <i class="fa fa-angle-left fa-2x" on:click={goBack} />
  <div>
    <Card {testimonials} {testimonialNum} {xOffest} />
    {#if testimonials[testimonialNum + 1] || testimonials[testimonialNum - testimonials.length - 1]}
      <Card {testimonials} testimonialNum={testimonialNum + 1} {xOffest} />
    {/if}
    {#if testimonials[testimonialNum + 2] || testimonials[testimonialNum - testimonials.length - 2]}
      <Card {testimonials} testimonialNum={testimonialNum + 2} {xOffest} />
    {/if}
  </div>
  <i class="fa fa-angle-right fa-2x" on:click={goForward} />
</section>

<style>
  :root {
    --primary: #6ac;
    --primary-dark: #269;
    --primary-light: #9de;
    --primary-light-trans: #9df4;
    --primary-contrast: #fff;
    --primary-accent: #75b;
    --primary-neutral: #888;
    --alt-one: #37a;
    --alt-two: #6a6;
    --primary-font: Nunito Sans;
  }
  /* :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } */
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--primary-light-trans);
    overflow: hidden;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 150px;
  }
  i {
    padding: 2px;
    color: var(--primary-accent);
    font-size: 1.5rem;
  }
</style>
