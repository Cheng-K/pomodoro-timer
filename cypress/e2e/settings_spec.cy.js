describe("Settings", () => {
  before(() => {
    cy.visit("http://localhost:5173");
    indexedDB.deleteDatabase("PomodoroDatabase");
  });
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get('[data-cy="settings-btn"]').click();
    cy.get('[data-cy="settings-modal"]').should("be.visible");
  });
  it("Should display available settings", () => {
    cy.get('[data-cy="settings-work-mins-label"]')
      .should("be.visible")
      .and("have.text", "Duration of each work session (mins)");
    cy.get('[data-cy="settings-work-mins-input"]')
      .should("be.visible")
      .and("have.attr", "type", "number")
      .and("have.attr", "min", 25)
      .and("have.attr", "max", 60)
      .and("have.value", 25);
    cy.get('[data-cy="settings-shortbreak-mins-label"]')
      .should("be.visible")
      .and("have.text", "Duration of each short break (mins)");
    cy.get('[data-cy="settings-shortbreak-mins-input"]')
      .should("be.visible")
      .and("have.attr", "type", "number")
      .and("have.attr", "min", 5)
      .and("have.attr", "max", 10)
      .and("have.value", 5);
    cy.get('[data-cy="settings-longbreak-mins-label"]')
      .should("be.visible")
      .and("have.text", "Duration of each long break (mins)");
    cy.get('[data-cy="settings-longbreak-mins-input"]')
      .should("be.visible")
      .and("have.attr", "type", "number")
      .and("have.attr", "min", 15)
      .and("have.attr", "max", 30)
      .and("have.value", 15);
    cy.get('[data-cy="settings-session-label"]')
      .should("be.visible")
      .and("have.text", "Number of sessions to long break");
    cy.get('[data-cy="settings-session-input"]')
      .should("be.visible")
      .and("have.attr", "type", "number")
      .and("have.attr", "min", 4)
      .and("have.attr", "max", 8)
      .and("have.value", 4);
  });
  it("Should have form validation", () => {
    cy.get('[data-cy="settings-work-mins-input"]').clear().type(0);
    cy.get('[data-cy="settings-shortbreak-mins-input"]').clear().type(11);
    cy.get('[data-cy="settings-longbreak-mins-input"]').clear().type(4);
    cy.get('[data-cy="settings-session-input"]').clear().type(9);
    cy.get('[data-cy="settings-submit-btn"]').click();
    cy.get('[data-cy="settings-work-mins-input-invalid-feedback"]')
      .should("be.visible")
      .and(
        "have.text",
        "Please provide a valid numeric input. Value must be between 25 to 60 mins"
      );
    cy.get('[data-cy="settings-shortbreak-mins-input-invalid-feedback"]')
      .should("be.visible")
      .and(
        "have.text",
        "Please provide a valid numeric input. Value must be between 5 to 10 mins"
      );
    cy.get('[data-cy="settings-longbreak-mins-input-invalid-feedback"]')
      .should("be.visible")
      .and(
        "have.text",
        "Please provide a valid numeric input. Value must be between 15 to 30 mins"
      );
    cy.get('[data-cy="settings-session-input-invalid-feedback"]')
      .should("be.visible")
      .and(
        "have.text",
        "Please provide a valid numeric input. Value must be between 4 to 8 sessions"
      );
  });

  it("Should update the settings when accepted", () => {
    cy.get('[data-cy="settings-work-mins-input"]').clear().type(60);
    cy.get('[data-cy="settings-shortbreak-mins-input"]').clear().type(10);
    cy.get('[data-cy="settings-longbreak-mins-input"]').clear().type(30);
    cy.get('[data-cy="settings-session-input"]').clear().type(8);
    cy.get('[data-cy="settings-submit-btn"]').click();
    cy.get('[data-cy="settings-work-mins-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get(
      '[data-cy="settings-shortbreak-mins-input-invalid-feedback"]'
    ).should("not.be.visible");
    cy.get('[data-cy="settings-longbreak-mins-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get('[data-cy="settings-session-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get('[data-cy="settings-modal"]').find(".btn-close").click();
    cy.get('[data-cy="settings-modal"]').should("not.exist");

    for (let i = 1; i < 16; i++) {
      let timerLabelText = i % 2 === 0 ? "10:00" : "60:00";
      cy.get('[data-cy="timer-label"]').should("have.text", timerLabelText);
      cy.get('[data-cy="session-label"]').should(
        "have.text",
        `Session ${Math.ceil(i / 2)}/8`
      );
      cy.get('[data-cy="skip-btn"]').click();
    }
    cy.get('[data-cy="timer-label"]').should("have.text", "30:00");
    cy.get('[data-cy="session-label"]').should("have.text", `Session 8/8`);
    cy.get('[data-cy="skip-btn"]').click();
  });
  it("Should maintain previous settings", () => {
    cy.get('[data-cy="settings-work-mins-input"]').clear().type(40);
    cy.get('[data-cy="settings-shortbreak-mins-input"]').clear().type(8);
    cy.get('[data-cy="settings-longbreak-mins-input"]').clear().type(25);
    cy.get('[data-cy="settings-session-input"]').clear().type(6);
    cy.get('[data-cy="settings-submit-btn"]').click();
    cy.get('[data-cy="settings-work-mins-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get(
      '[data-cy="settings-shortbreak-mins-input-invalid-feedback"]'
    ).should("not.be.visible");
    cy.get('[data-cy="settings-longbreak-mins-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get('[data-cy="settings-session-input-invalid-feedback"]').should(
      "not.be.visible"
    );
    cy.get('[data-cy="settings-modal"]').find(".btn-close").click();
    cy.get('[data-cy="settings-modal"]').should("not.exist");
    cy.reload();
    for (let i = 1; i < 6 * 2; i++) {
      let timerLabelText = i % 2 === 0 ? "08:00" : "40:00";
      cy.get('[data-cy="timer-label"]').should("have.text", timerLabelText);
      cy.get('[data-cy="session-label"]').should(
        "have.text",
        `Session ${Math.ceil(i / 2)}/6`
      );
      cy.get('[data-cy="skip-btn"]').click();
    }
    cy.get('[data-cy="timer-label"]').should("have.text", "25:00");
    cy.get('[data-cy="session-label"]').should("have.text", `Session 6/6`);
    cy.get('[data-cy="skip-btn"]').click();

    cy.get('[data-cy="settings-btn"]').click();
    cy.get('[data-cy="settings-modal"]').should("be.visible");
    cy.get('[data-cy="settings-work-mins-input"]').should("have.value", 40);
    cy.get('[data-cy="settings-shortbreak-mins-input"]').should(
      "have.value",
      8
    );
    cy.get('[data-cy="settings-longbreak-mins-input"]').should(
      "have.value",
      25
    );
    cy.get('[data-cy="settings-session-input"]').should("have.value", 6);
  });
  it("Should be disabled when timer is running", () => {
    cy.get('[data-cy="settings-modal"]').find(".btn-close").click();
    cy.get('[data-cy="settings-modal"]').should("not.exist");
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="settings-btn"]').should("be.disabled");
  });
});
