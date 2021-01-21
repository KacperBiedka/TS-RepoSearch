describe('My first test', () => {
    it('Does nothing', () => {
        expect(true).to.equal(true);
    })
    it('visits the app', () => {
        cy.visit('http://localhost:3000');
    })
});