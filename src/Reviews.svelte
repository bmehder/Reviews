<script>
  import { fly } from 'svelte/transition'
  import { reviews } from './reviewsData.js'

  import Card from './Card.svelte'

  const SET_OF_REVIEWS = 3
  const DISTANCE = 800

  let reviewNumber = 0
  let xOffset = null

  $: isAtBeginning = reviewNumber === 0
  $: isBeforeEnd = reviewNumber < reviews.length - SET_OF_REVIEWS
  const isNext = direction => direction === 'next'

  const getStartOfFirstSet = () => reviews.length - reviews.length
  const getStartOfLastSet = () => reviews.length - SET_OF_REVIEWS
  const getPreviousSet = () => reviewNumber - SET_OF_REVIEWS
  const getNextSet = () => reviewNumber + SET_OF_REVIEWS
  const getXOffset = direction => (isNext(direction) ? DISTANCE : DISTANCE * -1)

  const getNextReviews = () => (isBeforeEnd ? getNextSet() : getStartOfFirstSet())
  const getPrevReviews = () => (isAtBeginning ? getStartOfLastSet() : getPreviousSet())

  const setXOffset = direction => (xOffset = getXOffset(direction))

  const setReviewNumber = direction =>
    (reviewNumber = isNext(direction) ? getNextReviews() : getPrevReviews())

  const handleClick = direction => setXOffset(direction) && setReviewNumber(direction)
</script>

<div class="outer">
  <i class="fa fa-angle-left fa-3x" on:click={() => handleClick('prev')} />
  {#key reviewNumber}
    <div class="inner" in:fly={{ x: xOffset }}>
      {#each Array(SET_OF_REVIEWS) as _, index}
        <Card reviewNumber={reviewNumber + index} />
      {/each}
    </div>
  {/key}
  <i class="fa fa-angle-right fa-3x" on:click={() => handleClick('next')} />
</div>

<style>
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
