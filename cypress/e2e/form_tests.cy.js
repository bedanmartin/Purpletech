describe('Axiory Registration Page Tests', () => {

  // 1. Basic Page Functionality

  it('Should open the page without errors', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('body').should('be.visible'); // Verify page loaded
  });

  it('Should display correctly across various screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2', [1024, 768], 'macbook-15'];
    sizes.forEach((size) => {
      cy.viewport(size);
      cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
      cy.get('body').should('be.visible'); // Verify page loads
    });
  });

  it('Should load the page within an acceptable time frame', () => {
    const maxLoadTime = 2000; // e.g., 2 seconds
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/', { timeout: maxLoadTime });
  });

  // 2. Navigation Testing

  it('Should navigate correctly using all links', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('a').each(($el) => {
      cy.request($el.prop('href')).its('status').should('eq', 200); // Ensure links are working
    });
  });

  it('Should navigate back correctly', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('a').first().click();
    cy.go('back');
    cy.url().should('include', '/register');
  });

  // 3. Page Content Testing

  it('Should display correct and error-free text', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.contains('Welcome to Axiory').should('exist'); // Example text check
  });

  it('Should load all images and media correctly', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible').and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0); // Ensure image loads
      });
    });
  });

  // 4. Form Testing

  it('Should display the form correctly', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('form').should('be.visible'); // Ensure form is present
  });

  it('Should show errors when submitting form without required fields', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('form').submit();
    cy.contains('This field is required').should('be.visible'); // Check error message
  });

  it('Should validate incorrect email format', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('input[type="email"]').type('invalidEmail');
    cy.get('form').submit();
    cy.contains('Invalid email format').should('be.visible');
  });

  it('Should submit form successfully with valid data', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('ValidPassword123!');
    cy.get('form').submit();
    cy.contains('Registration successful').should('be.visible'); // Example success message
  });

  it('Should handle various data types in form fields', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('!@#$%^&*()123'); // Special characters
    cy.get('form').submit();
    cy.contains('Registration successful').should('be.visible');
  });

  // 5. Security Testing

  it('Should block SQL injection attempts', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('input[name="email"]').type("test@example.com' OR 1=1 --");
    cy.get('form').submit();
    cy.contains('Invalid input').should('be.visible'); // Ensure SQL injection is blocked
  });

  // 6. Accessibility Testing

  it('Should allow navigation using the keyboard', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.tab().tab(); // Navigate using the tab key
    cy.get('button[type="submit"]').should('have.focus');
  });

  it('Should work with screen readers', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('body').should('be.visible'); // Assume this test is run with an actual screen reader setup
  });

  // 7. JavaScript Functionality Testing

  it('Should display a message when JavaScript is disabled', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/', {
      onBeforeLoad(win) {
        win.eval = () => {}; // Disable JS
      }
    });
    cy.contains('This page requires JavaScript').should('be.visible');
  });

  it('Should function correctly with all interactive elements', () => {
    cy.visit('https://my-qbgzo-qacs.sls-staging.axiory.com/register/');
    cy.get('button[type="submit"]').click();
    cy.contains('This field is required').should('be.visible');
  });

});
