/// <reference types="Cypress" />

describe("Add task modal", () => {
  before(() => {
    cy.visit("http://localhost:5173");
    indexedDB.deleteDatabase("PomodoroDatabase");
  });
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-panel-add-btn"]').click();
  });
  it("Should open when add task button clicked", () => {
    cy.get('[data-cy="add-task-modal"]').should("be.visible");
  });
  it("Should display all input components with labels", () => {
    cy.get('[for="addFormTitle"]')
      .should("be.visible")
      .and("have.text", "Task Name");
    cy.get('[for="addFormDueDate"]')
      .should("be.visible")
      .and("have.text", "Due Date");
    cy.get('[for="addFormDueTime"]')
      .should("be.visible")
      .and("have.text", "Due Time");
    cy.get('[data-cy="add-task-title-input"]')
      .should("be.visible")
      .and("have.attr", "type", "text")
      .and("have.attr", "maxLength", 40)
      .and("have.value", "");
    cy.get('[data-cy="add-task-calendar-input"]')
      .should("be.visible")
      .and("have.attr", "type", "date")
      .and("have.value", "")
      .and("have.attr", "min", "2023-01-01")
      .and("have.attr", "max", "9999-12-31");
    cy.get('[data-cy="add-task-time-input"]')
      .should("be.visible")
      .and("have.attr", "type", "time")
      .and("have.value", "")
      .and("be.disabled");
  });
  it("Should only enable time input when there is date", () => {
    cy.get('[data-cy="add-task-calendar-input"]').type("2022-12-26");
    cy.get('[data-cy="add-task-time-input"]').should("be.enabled");
    cy.get('[data-cy="add-task-calendar-input"]').clear();
    cy.get('[data-cy="add-task-time-input"]').should("be.disabled");
  });
  it("Should reject empty title submission", () => {
    cy.get('[data-cy="add-task-submit-btn"]').click();
    cy.get('[data-cy="add-task-modal"]').should("be.visible");
    cy.get('[data-cy="add-task-title-input-invalid-feedback"]')
      .should("be.visible")
      .and(
        "have.text",
        "Please provide a valid name for the task. It can have a maximum of 40 characters."
      );
  });
  it("Should accept a submission with title only", () => {
    let taskDisplayed = false;
    cy.get('[data-cy="add-task-title-input"]').type("A simple task");
    cy.get('[data-cy="add-task-submit-btn"]').click();
    cy.get('[data-cy="add-task-modal"]')
      .should("not.exist")
      .then(() => {
        cy.get('[data-cy="task-title-label"]')
          .first()
          .then((element) => {
            cy.wrap(element).should("have.text", "A simple task");
            cy.wrap(element)
              .find('[data-cy="task-calendar-label"]')
              .should("not.exist");
            cy.wrap(element)
              .find('[data-cy="task-time-label"]')
              .should("not.exist");
            cy.wrap(element)
              .siblings('[data-cy="working-pending-badge"]')
              .should("exist")
              .then((element) => {
                const styles = window.getComputedStyle(element[0], "::after");
                cy.wrap(styles.content).should("equal", '"Pending"');
              });
          });
      });
  });
  it("Should accept a submission with all inputs", () => {
    cy.get('[data-cy="add-task-title-input"]').type(
      "A simple task with date and time"
    );
    cy.get('[data-cy="add-task-calendar-input"]').type("2023-02-28");
    cy.get('[data-cy="add-task-time-input"]').type("12:00");
    cy.get('[data-cy="add-task-submit-btn"]').click();
    cy.get('[data-cy="add-task-modal"]')
      .should("not.exist")
      .then(() => cy.get('[data-cy="task-container"]'))
      .then((array) => {
        const target = array[0];
        cy.wrap(target)
          .find('[data-cy="task-title-label"]')
          .should("have.text", "A simple task with date and time");
        cy.wrap(target)
          .find('[data-cy="task-calendar-label"]')
          .should("have.text", "2023-02-28");
        cy.wrap(target)
          .find('[data-cy="task-time-label"]')
          .should("have.text", "12:00");
        cy.wrap(target)
          .find('[data-cy="working-pending-badge"]')
          .should("exist")
          .then((element) => {
            const styles = window.getComputedStyle(element[0], "::after");
            cy.wrap(styles.content).should("equal", '"Pending"');
          });
      });
  });
});
