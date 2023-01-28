const gallery = document.querySelector('.cardGallery');
const gallery_scroller = gallery.querySelector('.cardContainer');
const gallery_item_size = gallery_scroller.querySelector('div').clientWidth;

gallery.querySelector('.btn.next').addEventListener('click', scrollToNextPage);
gallery.querySelector('.btn.prev').addEventListener('click', scrollToPrevPage);

// For paginated scrolling, simply scroll the gallery one item in the given
// direction and let css scroll snaping handle the specific alignment.
function scrollToNextPage() {
  gallery_scroller.scrollBy(gallery_item_size, 0);
}
function scrollToPrevPage() {
  gallery_scroller.scrollBy(-gallery_item_size, 0);
}