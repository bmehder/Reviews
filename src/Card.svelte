<script>
  import { fly } from 'svelte/transition'

  export let testimonials
  export let testimonialNum = 0
  export let xOffest
</script>

{#key testimonialNum}
  <div class="card" in:fly={{ x: xOffest }}>
    <i class="fa fa-quote-left" />
    <div class="quote">
      <p>{testimonials[testimonialNum].text}</p>
    </div>
    <div class="meta">
      <p class="name">{testimonials[testimonialNum].name}</p>
      <p><small>{testimonials[testimonialNum].date}</small></p>
      <p>
        {#each Array(5) as _}
          <i class="fa fa-star" />
        {/each}
      </p>
    </div>
  </div>
{/key}

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 300px;
    flex-shrink: 0;
    padding: 2rem;
    aspect-ratio: 1;
    background-color: white;
    box-shadow: 2px 2px 20px -2px rgb(0 0 0 / 0.2);
    line-height: 1.5;
    font-style: italic;
  }
  .quote {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .meta {
    text-align: center;
  }
  .name {
    margin-top: 1rem;
    color: var(--primary);
    font-size: 120%;
    font-weight: bold;
  }
  .meta small {
    font-size: 80%;
  }
  .fa {
    padding: 2px;
    color: var(--primary);
    font-size: 1.5rem;
  }
  .fa-star {
    color: #f4d136;
  }
  @media screen and (max-width: 600px) {
    .card {
      flex-basis: 240px;
    }
  }
</style>
