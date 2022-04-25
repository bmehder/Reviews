<script>
  import { fly } from 'svelte/transition'
  import { isVisible, viewportObserver } from './utils.js'

  import Loading from './Loading.svelte'
  import Card from './Card.svelte'

  // CONSTANTS
  const SET_OF_REVIEWS = 3
  const NUMBER_OF_SETS = 3
  const DURATION = 800
  const DISTANCE = 1800
  const FETCH_OPTIONS = '?per_page=' + SET_OF_REVIEWS * NUMBER_OF_SETS
  const ENDPOINT = `https://sprucehealthgroup.com/wp-json/wp/v2/review${FETCH_OPTIONS}`

  // APP STATE
  let reviews = []
  let xOffset = null
  let reviewIndex = 0

  // PREDICATES
  const isAtBeginning = () => reviewIndex === 0
  const isBeforeEnd = () => reviewIndex < reviews.length - SET_OF_REVIEWS
  const isDirectionNext = direction => direction === 'next'

  // GET STATE
  const getFirstSetIndex = () => reviews.length - reviews.length
  const getLastSetIndex = () => reviews.length - SET_OF_REVIEWS
  const getPrevSetIndex = () => reviewIndex - SET_OF_REVIEWS
  const getNextSetIndex = () => reviewIndex + SET_OF_REVIEWS
  const getXOffset = direction => (isDirectionNext(direction) ? DISTANCE : DISTANCE * -1)

  // GET STATE ROUTING FUNCTIONS
  const getNextReviews = () => (isBeforeEnd() ? getNextSetIndex() : getFirstSetIndex())
  const getPrevReviews = () => (isAtBeginning() ? getLastSetIndex() : getPrevSetIndex())

  // SET STATE
  const setReviews = data => (reviews = data)
  const setXOffset = direction => (xOffset = getXOffset(direction))
  const setReviewIndex = direction =>
    (reviewIndex = isDirectionNext(direction) ? getNextReviews() : getPrevReviews())

  // EVENT HANDLERS
  const handleEvent = direction => setXOffset(direction) && setReviewIndex(direction)

  const handleKeydown = event =>
    (event.key === 'ArrowRight' && handleEvent('next')) ||
    (event.key === 'ArrowLeft' && handleEvent('prev'))

  // API REQUEST
  const fetchData = () => fetch(ENDPOINT).then(response => response.json())
  const getReviews = () => fetchData().then(data => setReviews(data))
</script>

<svelte:window on:keydown={e => $isVisible && handleKeydown(e)} />

{#await getReviews()}
  <Loading />
{:then reviews}
  <div use:viewportObserver class="outer">
    <i
      class="fa fa-angle-left fa-3x"
      aria-label="Load Previous Reviews"
      on:click={() => handleEvent('prev')}
    />
    {#key reviewIndex}
      <div class="inner" in:fly={{ x: xOffset, duration: DURATION }}>
        {#each Array(SET_OF_REVIEWS) as _, loopIndex}
          <Card review={reviews[reviewIndex + loopIndex]} />
        {/each}
      </div>
    {/key}
    <i
      class="fa fa-angle-right fa-3x"
      aria-label="Load Next Reviews"
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
      padding: 0;
    }
    .fa {
      display: none;
    }
  }
</style>
