export const setScroll = (topScroll: number) => {
  window.scrollTo({
    top: topScroll,
    behavior: 'smooth',
  })
}
