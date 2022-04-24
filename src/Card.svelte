<script>
  export let reviews = []
  export let reviewNumber = null

  console.log(reviews[reviewNumber])
</script>

<div class="card">
  <i class="fa fa-quote-left" />
  <div class="quote">
    <p>{@html reviews[reviewNumber]?.content.rendered}</p>
  </div>
  <div class="meta">
    <p class="name">{reviews[reviewNumber]?.title.rendered}</p>
    <p><small class="date">{reviews[reviewNumber]?.date}</small></p>
    <p>
      <!-- {#each Array(stars) as _} -->
      {#each Array(5) as _}
        <i class="fa fa-star" />
      {/each}
    </p>
  </div>
</div>

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
    gap: 1rem;
    padding: 2rem;
    background-color: white;
    text-align: left;
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
    color: var(--primary);
    font-size: 120%;
    font-weight: bold;
  }
  .date {
    font-size: 80%;
  }
  .fa {
    padding: 2px;
    color: var(--primary);
    font-size: 1.5rem;
  }
  .fa-star {
    margin-top: 0.25rem;
    color: #f4d136;
  }
</style>
