export function smoothScroll() {
  const firstItem = document
    .querySelector('.movies-list')
    .firstElementChild.getBoundingClientRect();

  window.scrollTo({ top: firstItem, behavior: 'smooth' });
}
