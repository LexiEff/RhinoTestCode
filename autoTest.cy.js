/* 1. Get all rhinos with no filter values to retrieve the full set of rhinos in the system.
2. Create a new rhino with the name "Clyde5000" and the species "javan_rhinoceros".
3. Verify that when filtering by "javan_rhinoceros" in the GET action, the newly created rhino is present in the search result.
4. Verify that when filtering by "indian_rhinoceros" in the GET action, the newly created rhino is NOT present in the search result. */

//__________________________________________

describe("Clyde QA Test", () => {
  beforeEach("open homepage", () => {
    cy.openHP();
  });

  //  1. Get all rhinos with no filter values to retrieve the full set of rhinos in the system.
  it('Filter with no values"', () => {
    cy.get('[data-cy="rhino-button-all"]');
    cy.get(".rhino-inputs__form").find("button").eq(1).click(); // eq is NOT ideal b/c multiple elemnts can be on page & test will break if elemnt is added
    // ADD TO TEST: need to make an assertion. Can see table with all valaues (validate that rows are not empty)
  }); 

  // 2. Creates a new rhino with the name "Clyde5000" and the species "javan_rhinoceros
  it('New Rhino"', () => {
    cy.get('[data-cy="create-rhino"]').type("Clyde5000"); // Type 'Hello, World' into the 'input'
    cy.get('input[name="createSpecies"]').type("javan_rhinoceros");
    cy.get(".rhino-inputs__form").find("button").eq(0).click();
  });

  //3. Verify that when filtering by "javan_rhinoceros" in the GET action, the newly created rhino is present in the search result.

  it('Filtering For Rhinos"', () => {
    cy.intercept("GET", "http://localhost:4000/rhinoceros*").as("getRhinos"); // getRhino's will act as a variable to store the response
    cy.get('[data-cy="rhino-button-all"]').type("javan_rhinoceros");
    cy.get(".rhino-inputs__form").find("button").eq(1).click();

    cy.wait("@getRhinos");
    cy.get("@getRhinos").then((rhinoName) => {
      console.log(rhinoName);
      expect(rhinoName.response.statusCode).to.equal(200);
      expect(rhinoName.response.body.rhinoceroses[3].name).to.equal( "Clyde5000");
    });
  });

//4. Verify that when filtering by "indian_rhinoceros" in the GET action, the newly created rhino is NOT present in the search result. */

  it("Checks for Indian Rhions", () => {
      cy.get('[data-cy="rhino-button-all"]').clear().type("indian_rhinoceros");
      cy.get(".rhino-inputs__form").find("button").eq(1).click();
    });

  it("Indian Rhino", () => {
      cy.intercept("GET", "http://localhost:4000/rhinoceros*").as("getIRhinos"); // getRhino's will act as a variable to store the response
      cy.get('[data-cy="rhino-button-all"]').clear().type("indian_rhinoceros");
      cy.get(".rhino-inputs__form").find("button").eq(1).click();

      cy.get("@getIRhinos").then((rhinoName) => {
        console.log(rhinoName);
        expect(rhinoName.response.statusCode).to.equal(200);
        expect(rhinoName.response.body.rhinoceroses[3].name).to.equal("Clyde5000" );// change to contains
      });
    });
  });

