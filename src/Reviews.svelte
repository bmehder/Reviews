<script>
  import { fly } from 'svelte/transition'
  import { reviews } from './reviewsData.js'
  import { isVisible, viewportObserver } from './store.js'

  import Card from './Card.svelte'

  const SET_OF_REVIEWS = 3
  const DISTANCE = 1800

  let xOffset = null
  let reviewNumber = 0

  $: isAtBeginning = reviewNumber === 0
  $: isBeforeEnd = reviewNumber < reviews.length - SET_OF_REVIEWS
  const isNext = direction => direction === 'next'

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

  const reset = () => {
    xOffset = null
    reviewNumber = getFirstSetIndex()
  }

  const handleEvent = direction => setXOffset(direction) && setReviewNumber(direction)

  const handleKeydown = event => {
    if (!$isVisible) return

    if (event.key === 'ArrowRight') {
      handleEvent('next')
      return
    }

    if (event.key === 'ArrowLeft') {
      handleEvent('prev')
      return
    }

    if (event.key === 'Enter') {
      reset()
    }
  }
</script>

<svelte:window on:keydown={e => handleKeydown(e)} />

<div use:viewportObserver class="outer">
  <i
    aria-label="Load Previous Reviews"
    class="fa fa-angle-left fa-3x"
    on:click={() => handleEvent('prev')}
  />
  {#key reviewNumber}
    <div class="inner" in:fly={{ x: xOffset, duration: 800 }}>
      {#each Array(SET_OF_REVIEWS) as _, index}
        <Card reviewNumber={reviewNumber + index} />
      {/each}
    </div>
  {/key}
  <i
    aria-label="Load Next Reviews"
    class="fa fa-angle-right fa-3x"
    on:click={() => handleEvent('next')}
  />
</div>

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
    .fa {
      display: none;
    }
  }
</style>
