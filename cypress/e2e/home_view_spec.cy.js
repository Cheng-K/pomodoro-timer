/// <reference types="Cypress" />

describe("Home view on load", () => {
  before(() => {
    cy.visit("http://localhost:5173");
    indexedDB.deleteDatabase("PomodoroDatabase");
  });
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("Should display header component", () => {
    cy.get('[data-cy="header-title"]').should("have.text", "Stay focused");
    cy.get('[data-cy="task-btn"]').should("be.visible");
    cy.get('[data-cy="settings-btn"]').should("be.visible");
    cy.get('[data-cy="task-btn-tooltip"]').should("be.hidden");
    cy.get('[data-cy="settings-btn-tooltip"]').should("be.hidden");
  });
  it("Should display the timer component ", () => {
    cy.get('[data-cy="timer-progress-border"]')
      .should("be.visible")
      .and("have.css", "stroke", "rgb(230, 57, 70)")
      .and("have.attr", "stroke-dasharray", "25.2 26");
    cy.get('[data-cy="timer-background-border"]')
      .should("exist")
      .and("have.css", "stroke", "rgb(197, 197, 197)");
    cy.get('[data-cy="timer-label"]')
      .should("be.visible")
      .and("have.text", "25:00");
  });
  it("Should display the active task or default placeholder", () => {
    cy.get('[data-cy="active-task-placeholder"]')
      .should("have.text", "Select a task to work on in task panel")
      .and("be.visible");
    cy.get('[data-cy="active-task"]').should("not.exist");
  });
  it("Should display control buttons of timer", () => {
    cy.get('[data-cy="play-btn"]').should("be.visible").and("be.enabled");
    cy.get('[data-cy="skip-btn"]').should("be.visible").and("be.enabled");
    cy.get('[data-cy="restart-btn"]').should("be.visible").and("be.disabled");
    cy.get('[data-cy="pause-btn"]').should("not.exist");
  });
  it("Should display session control", () => {
    cy.get('[data-cy="session-label"]')
      .should("be.visible")
      .and("contain.text", "Session 1/4");
    cy.get('[data-cy="session-restart-btn"]')
      .should("be.visible")
      .and("be.enabled");
  });
});

describe("Timer", () => {
  beforeEach(() => cy.visit("http://localhost:5173"));
  it("Should update timer label and control buttons when started", () => {
    cy.title().should("eq", "25:00");
    cy.get('[data-cy="play-btn"]').click().should("not.exist");
    cy.get('[data-cy="pause-btn"]').should("be.visible");
    cy.wait(1000);
    cy.get('[data-cy="timer-label"]').should("have.text", "24:59");
    cy.title().should("eq", "24:59");
    cy.wait(5000);
    cy.get('[data-cy="timer-progress-border"]')
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).lessThan(25.2);
        expect(Number(arr[1])).equal(26);
      });
  });
  it("Should stop updating timer label and update control buttons when paused", () => {
    let initialBorder;
    cy.get('[data-cy="play-btn"]').click().should("not.exist");
    cy.get('[data-cy="pause-btn"]').should("be.visible");
    cy.wait(3000);
    cy.get('[data-cy="timer-label"]').should("have.text", "24:57");
    cy.get('[data-cy="pause-btn"]').click().should("not.exist");
    cy.get('[data-cy="play-btn"]').should("be.visible");
    cy.get('[data-cy="timer-progress-border"]')
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        initialBorder = Number(arr[0]);
      });
    cy.wait(2000);
    cy.get('[data-cy="timer-label"]').should("have.text", "24:57");
    cy.title().should("eq", "24:57");
    cy.get('[data-cy="timer-progress-border"]')
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).equal(initialBorder);
      });
  });
  it("Should update timer label and control buttons when restarted", () => {
    cy.get('[data-cy="play-btn"]').click().should("not.exist");
    cy.get('[data-cy="pause-btn"]').should("be.visible");
    cy.wait(3000);
    cy.get('[data-cy="restart-btn"]').click().should("be.disabled");
    cy.get('[data-cy="pause-btn"]').should("not.exist");
    cy.get('[data-cy="play-btn"]').should("be.visible");
    cy.get('[data-cy="timer-label"]').should("have.text", "25:00");
    cy.title().should("eq", "25:00");
    cy.get('[data-cy="timer-progress-border"]')
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).equal(25.2);
        expect(Number(arr[1])).equal(26);
      });
    cy.get('[data-cy="header-title"]').should("have.text", "Stay focused");
  });
  it("Should update timer label and session when skipped", () => {
    cy.get('[data-cy="play-btn"]').click().should("not.exist");
    cy.get('[data-cy="pause-btn"]').should("be.visible");
    cy.wait(3000);
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="pause-btn"]').should("not.exist");
    cy.get('[data-cy="play-btn"]').should("be.visible");
    cy.get('[data-cy="timer-label"]').should("have.text", "05:00");
    cy.title().should("eq", "05:00");
    cy.get('[data-cy="timer-progress-border"]')
      .should("have.css", "stroke", "rgb(69, 123, 157)")
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).equal(25.2);
        expect(Number(arr[1])).equal(26);
      });
    cy.get('[data-cy="session-label"]').should("have.text", "Session 1/4");
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="session-label"]').should("have.text", "Session 2/4");
    cy.get('[data-cy="timer-progress-border"]')
      .should("have.css", "stroke", "rgb(230, 57, 70)")
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).equal(25.2);
        expect(Number(arr[1])).equal(26);
      });
  });
  it("Should only be able to restart when current time is not same as initial time", () => {
    cy.get('[data-cy="restart-btn"]').should("be.disabled");
    cy.get('[data-cy="play-btn"]').click();
    cy.wait(2000);
    cy.get('[data-cy="pause-btn"]').click();
    cy.get('[data-cy="restart-btn"]').click();
    cy.get('[data-cy="timer-progress-border"]')
      .should("have.css", "stroke", "rgb(230, 57, 70)")
      .invoke("attr", "stroke-dasharray")
      .then((value) => {
        let arr = value.split(" ");
        expect(Number(arr[0])).equal(25.2);
        expect(Number(arr[1])).equal(26);
      });
    cy.get('[data-cy="timer-label"]').should("have.text", "25:00");
  });
});

describe("Sessions", () => {
  beforeEach(() => cy.visit("http://localhost:5173"));
  it("Should restart when the restart button is clicked", () => {
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="skip-btn"]').click();
    cy.get('[data-cy="session-restart-btn"]').click();
    cy.get('[data-cy="session-label"]').should("have.text", "Session 1/4");
  });
  it("Should increment on every two skip", () => {
    for (let i = 1; i <= 7; i += 2) {
      cy.get('[data-cy="header-title"]').should("have.text", "Stay focused");
      cy.get('[data-cy="session-label"]').should(
        "have.text",
        `Session ${Math.ceil(i / 2)}/4`
      );
      cy.title().should("eq", "25:00");
      cy.get('[data-cy="skip-btn"]').click();
      cy.get('[data-cy="header-title"]').should("have.text", "Take a break");
      cy.title().should("eq", i < 7 ? "05:00" : "15:00");
      cy.get('[data-cy="skip-btn"]').click();
    }
    cy.get('[data-cy="header-title"]').should("have.text", "Stay focused");
    cy.get('[data-cy="session-label"]').should("have.text", "Session 1/4");
  });
  it("Should not be able to restart when timer is running", () => {
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="session-restart-btn"]').should("be.disabled");
  });
});
