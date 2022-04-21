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

<div class="outer">
  <i class="fa fa-angle-left fa-3x" on:click={goBack} />
  <div class="inner">
    <Card {testimonials} {testimonialNum} {xOffest} />
    <Card {testimonials} testimonialNum={testimonialNum + 1} {xOffest} />
    <Card {testimonials} testimonialNum={testimonialNum + 2} {xOffest} />
  </div>
  <i class="fa fa-angle-right fa-3x" on:click={goForward} />
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
