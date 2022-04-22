<script>
  import { fly } from 'svelte/transition'
  import { reviews } from './reviewsData.js'
  import { observeAction, isVisible } from './store.js'

  import Card from './Card.svelte'

  const SET_OF_REVIEWS = 3
  const DISTANCE = 1800

  let reviewNumber = 0
  let xOffset = null

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
  // prettier-ignore
  const setReviewNumber = direction => (reviewNumber = isNext(direction) ? getNextReviews() : getPrevReviews())

  const handleEvent = direction => setXOffset(direction) && setReviewNumber(direction)

  const handleKeydown = event => {
    if (!$isVisible) return

    if (event.key === 'ArrowRight') {
      handleEvent('next')
    }

    if (event.key === 'ArrowLeft') {
      handleEvent('prev')
    }
  }
</script>

<svelte:window on:keydown={e => handleKeydown(e)} />

<div use:observeAction class="outer">
  <i class="fa fa-angle-left fa-3x" on:click={() => handleEvent('prev')} />
  {#key reviewNumber}
    <div class="inner" in:fly={{ x: xOffset }}>
      {#each Array(SET_OF_REVIEWS) as _, index}
        <Card reviewNumber={reviewNumber + index} />
      {/each}
    </div>
  {/key}
  <i class="fa fa-angle-right fa-3x" on:click={() => handleEvent('next')} />
</div>

<style>
  .outer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
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

  @media screen and (max-width: 720px) {
    .fa {
      display: none;
    }
  }
</style>
