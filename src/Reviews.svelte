<script>
  import { fly } from 'svelte/transition'
  import { reviews } from './reviewsData.js'

  import Card from './Card.svelte'

  const SET_OF_REVIEWS = 3
  const DISTANCE = 800

  let reviewNumber = 0
  let xOffset = null

  $: isAtBeginning = reviewNumber === 0
  $: isAtEnd = reviewNumber < reviews.length - SET_OF_REVIEWS

  const getStartOfFirstSet = () => 0
  const getStartOfLastSet = () => reviews.length - SET_OF_REVIEWS
  const getPreviousSet = () => reviewNumber - SET_OF_REVIEWS
  const getNextSet = () => reviewNumber + SET_OF_REVIEWS
  const getXOffset = direction => (direction === 'next' ? DISTANCE : DISTANCE * -1)

  const goForward = direction => {
    xOffset = getXOffset(direction)
    reviewNumber = isAtEnd ? getNextSet() : getStartOfFirstSet()
  }

  const goBackward = direction => {
    xOffset = getXOffset(direction)
    reviewNumber = isAtBeginning ? getStartOfLastSet() : getPreviousSet()
  }

  const handleClick = direction =>
    direction === 'next' ? goForward(direction) : goBackward(direction)
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
