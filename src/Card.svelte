<script>
  export let review = {}

  const quote = review.content.rendered
  const name = review.title.rendered
  const dateOptions = { month: 'short', year: 'numeric', day: 'numeric' }
  const date = new Date(review.date).toLocaleDateString('en-US', dateOptions)
  const stars = +review._bd_reviews_rating

  console.log(review)
</script>

<div class="card">
  <div class="quote">
    <p>{@html quote}</p>
  </div>
  <div class="meta">
    <p class="name">{name}</p>
    <p><small class="date">{date}</small></p>
    <p>
      {#each Array(stars) as _}
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
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background-color: white;
    text-align: left;
    box-shadow: 2px 2px 20px -2px rgb(0 0 0 / 0.2);
    line-height: 1.5;
    font-style: italic;
  }
  .quote::before {
    content: '\201c';
    color: var(--primary);
    font-size: 4rem;
    line-height: 3rem;
    text-align: center;
  }
  .quote {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-bottom: auto;
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
