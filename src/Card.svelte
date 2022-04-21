<script>
  import { fly } from 'svelte/transition'

  export let testimonials
  export let testimonialNum = 0
  export let xOffest
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</svelte:head>

{#key testimonialNum}
  <div class="outer" in:fly={{ x: xOffest }}>
    <i class="fa fa-quote-left" />
    <div class="quote">
      <p>{testimonials[testimonialNum].text}</p>
    </div>
    <div class="meta">
      <p class="name">{testimonials[testimonialNum].name}</p>
      <p><small>Sat, Apr 10, 2021</small></p>
      <p>
        {#each Array(5) as item}
          <i class="fa fa-star" />
        {/each}
      </p>
    </div>
  </div>
{/key}

<style>
  .outer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 300px;
    flex-shrink: 0;
    margin: 2rem 1rem;
    padding: 2rem;
    aspect-ratio: 1;
    background-color: white;
    box-shadow: 2px 2px 20px -2px rgb(0 0 0 / 0.1);
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
    color: var(--primary-accent);
    font-size: 120%;
    font-weight: bold;
  }
  small {
    font-size: 80%;
  }
  p {
    margin: 0;
  }
  i {
    padding: 2px;
    color: var(--primary-accent);
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    .outer {
      flex-basis: 240px;
    }
  }
</style>
