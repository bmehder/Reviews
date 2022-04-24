<script>
  import { fly } from 'svelte/transition'
  import { isVisible, viewportObserver } from './store.js'

  import Card from './Card.svelte'

  const SET_OF_REVIEWS = 3
  const NUMBER_OF_SETS = 3
  const DISTANCE = 1800
  const ENDPOINT = `https://sprucehealthgroup.com/wp-json/wp/v2/review?per_page=${
    SET_OF_REVIEWS * NUMBER_OF_SETS
  }`

  let reviews = []
  let xOffset = null
  let reviewNumber = 0

  $: isAtBeginning = reviewNumber === 0
  $: isBeforeEnd = reviewNumber < reviews.length - SET_OF_REVIEWS
  const isNext = direction => direction === 'next'

  const getReviews = () => fetch(ENDPOINT).then(response => response.json())

  const getFirstSetIndex = () => reviews.length - reviews.length
  const getLastSetIndex = () => reviews.length - SET_OF_REVIEWS
  const getPrevSetIndex = () => reviewNumber - SET_OF_REVIEWS
  const getNextSetIndex = () => reviewNumber + SET_OF_REVIEWS

  const getXOffset = direction => (isNext(direction) ? DISTANCE : DISTANCE * -1)

  const getNextReviews = () => (isBeforeEnd ? getNextSetIndex() : getFirstSetIndex())
  const getPrevReviews = () => (isAtBeginning ? getLastSetIndex() : getPrevSetIndex())

  const setXOffset = direction => (xOffset = getXOffset(direction))

  const setReviewNumber = direction =>
    (reviewNumber = isNext(direction) ? getNextReviews() : getPrevReviews())

  const handleEvent = direction => setXOffset(direction) && setReviewNumber(direction)

  const handleKeydown = event =>
    (event.key === 'ArrowRight' && handleEvent('next')) ||
    (event.key === 'ArrowLeft' && handleEvent('prev'))

  const init = getReviews().then(data => (reviews = data))

  // $: console.log(reviews)
</script>

<svelte:window on:keydown={e => $isVisible && handleKeydown(e)} />

{#await init}
  <p>Loading...</p>
{:then reviews}
  <div use:viewportObserver class="outer">
    <i
      aria-label="Load Previous Reviews"
      class="fa fa-angle-left fa-3x"
      on:click={() => handleEvent('prev')}
    />
    {#key reviewNumber}
      <div class="inner" in:fly={{ x: xOffset, duration: 800 }}>
        {#each Array(SET_OF_REVIEWS) as _, index}
          <Card review={reviews[reviewNumber + index]} />
        {/each}
      </div>
    {/key}
    <i
      aria-label="Load Next Reviews"
      class="fa fa-angle-right fa-3x"
      on:click={() => handleEvent('next')}
    />
  </div>
{:catch error}
  <p>{error}</p>
{/await}

<style>
  .outer {
    width: 100%;
    max-width: 1140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .inner {
    width: calc(100% - 4rem);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    gap: 2rem;
    margin: auto;
    padding: 0 2rem;
  }
  .fa {
    color: var(--primary-dark);
    cursor: pointer;
    transition: transform 200ms ease-in-out;
  }
  .fa:hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: 768px) {
    .inner {
      width: 100%;
    }
    .fa {
      display: none;
    }
  }
</style>
