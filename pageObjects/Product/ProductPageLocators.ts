export const ProductPageLocators = {
  searchInput: '#search_product',
  searchButton: '#submit_search',
  cartModal: '#cartModal',
  cartModalTitle: '.modal-title',
  viewCartLink: {
    role: 'link' as const,
    name: 'View Cart',
  },
  productName: '.productinfo p',
  addToCartButton: 'a:has-text("Add to cart")',
};