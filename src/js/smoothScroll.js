export function smoothScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }, 2000);
}
