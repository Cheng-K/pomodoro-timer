const numberOfTasks = 5;
describe("Task Panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    indexedDB.deleteDatabase("PomodoroDatabase");
    cy.get('[data-cy="task-btn"]').click();
    for (let i = 0; i < numberOfTasks; i++) {
      cy.get('[data-cy="task-panel-add-btn"]').click();
      cy.get('[data-cy="add-task-modal"]').should("be.visible");
      cy.get('[data-cy="add-task-title-input"]').type("Demo task");
      cy.get('[data-cy="add-task-calendar-input"]').type("2023-03-01");
      cy.get('[data-cy="add-task-time-input"]').type("12:23");
      cy.get('[data-cy="add-task-submit-btn"]').click();
      cy.get('[data-cy="add-task-modal"]').should("not.exist");
    }
    cy.reload();
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-panel-container"]').should("be.visible");
  });
  it("Should close task panel when close button is clicked", () => {
    cy.get('[data-cy="task-panel-close-btn"]').click();
    cy.get('[data-cy="task-panel-container"]').should("not.be.visible");
  });
  it("Should be disabled when timer is running", () => {
    cy.get('[data-cy="task-panel-close-btn"]').click();
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="task-btn"]').should("be.disabled");
  });
  it("Should have proper display in normal mode", () => {
    cy.get('[data-cy="task-panel-title-label"]').should("have.text", "Tasks");
    cy.get('[data-cy="task-panel-add-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-edit-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-visibility-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-close-btn"]').should("be.visible");
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="task-title-label"]')
        .should("be.visible")
        .and("have.text", "Demo task");
      cy.wrap(element)
        .find('[data-cy="task-calendar-label"]')
        .should("be.visible")
        .and("have.text", "2023-03-01");
      cy.wrap(element)
        .find('[data-cy="task-time-label"]')
        .should("be.visible")
        .and("have.text", "12:23");
      cy.wrap(element)
        .find('[data-cy="working-pending-badge"]')
        .should("exist")
        .then((element) => {
          const styles = window.getComputedStyle(element[0], "::after");
          cy.wrap(styles.content).should("equal", '"Pending"');
        });
      cy.wrap(element).find('[data-cy="task-checkbox"]').should("be.visible");
      cy.wrap(element)
        .find('[data-cy="edit-task-title-input"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-calendar-input"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-time-input"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-edit-btn"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-delete-btn"]')
        .should("not.exist");
    });
  });
  it("Should have proper display in edit mode", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-panel-title-label"]').should(
      "have.text",
      "Edit Tasks"
    );
    cy.get('[data-cy="task-panel-add-btn"]').should("not.exist");
    cy.get('[data-cy="task-panel-edit-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-visibility-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-delete-all-btn"]').should("be.visible");
    cy.get('[data-cy="task-panel-close-btn"]').should("be.visible");
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element).find('[data-cy="task-title-label"]').should("not.exist");
      cy.wrap(element)
        .find('[data-cy="task-calendar-label"]')
        .should("not.exist");
      cy.wrap(element).find('[data-cy="task-time-label"]').should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-title-input"]')
        .scrollIntoView()
        .should("be.visible")
        .and("is.disabled");
      cy.wrap(element)
        .find('[data-cy="edit-task-calendar-input"]')
        .scrollIntoView()
        .should("be.visible")
        .and("is.disabled");
      cy.wrap(element)
        .find('[data-cy="edit-task-time-input"]')
        .scrollIntoView()
        .should("be.visible")
        .and("is.disabled");
      cy.wrap(element)
        .find('[data-cy="edit-task-edit-btn"]')
        .scrollIntoView()
        .should("be.visible");
      cy.wrap(element)
        .find('[data-cy="edit-task-delete-btn"]')
        .scrollIntoView()
        .should("be.visible");
      cy.wrap(element).find('[data-cy="task-checkbox"]').should("not.exist");
    });
  });

  it("Should allow edit of task", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element).find('[data-cy="edit-task-edit-btn"]').click();
      cy.wrap(element)
        .find('[data-cy="edit-task-title-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("Edited Demo Task");
      cy.wrap(element)
        .find('[data-cy="edit-task-calendar-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("2023-03-02");
      cy.wrap(element)
        .find('[data-cy="edit-task-time-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("01:01");
      cy.wrap(element)
        .find('[data-cy="edit-task-edit-btn"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-submit-btn"]')
        .scrollIntoView()
        .should("be.visible")
        .click();
    });
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="task-title-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "Edited Demo Task");
      cy.wrap(element)
        .find('[data-cy="task-calendar-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "2023-03-02");
      cy.wrap(element)
        .find('[data-cy="task-time-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "01:01");
      cy.wrap(element)
        .find('[data-cy="working-pending-badge"]')
        .scrollIntoView()
        .should("be.visible")
        .then((element) => {
          const styles = window.getComputedStyle(element[0], "::after");
          cy.wrap(styles.content).should("equal", '"Pending"');
        });
    });
  });
  it("Should allow cancel edit of task", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="edit-task-edit-btn"]')
        .scrollIntoView()
        .click();
      cy.wrap(element)
        .find('[data-cy="edit-task-title-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("Edited Demo Task");
      cy.wrap(element)
        .find('[data-cy="edit-task-calendar-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("2023-03-02");
      cy.wrap(element)
        .find('[data-cy="edit-task-time-input"]')
        .scrollIntoView()
        .should("be.enabled")
        .clear()
        .type("01:01");
      cy.wrap(element)
        .find('[data-cy="edit-task-edit-btn"]')
        .should("not.exist");
      cy.wrap(element)
        .find('[data-cy="edit-task-submit-btn"]')
        .scrollIntoView()
        .should("be.visible");
    });
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="task-title-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "Demo task");
      cy.wrap(element)
        .find('[data-cy="task-calendar-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "2023-03-01");
      cy.wrap(element)
        .find('[data-cy="task-time-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "12:23");
      cy.wrap(element)
        .find('[data-cy="working-pending-badge"]')
        .scrollIntoView()
        .should("be.visible")
        .then((element) => {
          const styles = window.getComputedStyle(element[0], "::after");
          cy.wrap(styles.content).should("equal", '"Pending"');
        });
    });
  });
  it("Should allow delete task", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="edit-task-delete-btn"]')
        .scrollIntoView()
        .click();
      cy.get('[data-cy="delete-task-modal"]').should("be.visible");
      cy.get('[data-cy="delete-task-modal-title-label"]')
        .should("be.visible")
        .and("have.text", "Delete Confirmation");
      cy.get('[data-cy="delete-task-modal-content-label"]')
        .should("be.visible")
        .and("have.text", "Are you sure to delete Demo task?");
      cy.get('[data-cy="delete-task-modal-no-btn"]')
        .should("be.visible")
        .and("have.text", "No");
      cy.get('[data-cy="delete-task-modal-yes-btn"]')
        .should("be.visible")
        .and("have.text", "Yes")
        .click();
      cy.get('[data-cy="delete-task-modal"]').should("not.exist");
    });
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').should("not.exist");
    cy.reload();
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-container"]').should("not.exist");
  });

  it("Should allow cancel delete task", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="edit-task-delete-btn"]')
        .scrollIntoView()
        .click();
      cy.get('[data-cy="delete-task-modal"]').should("be.visible");
      cy.get('[data-cy="delete-task-modal-title-label"]')
        .should("be.visible")
        .and("have.text", "Delete Confirmation");
      cy.get('[data-cy="delete-task-modal-content-label"]')
        .should("be.visible")
        .and("have.text", "Are you sure to delete Demo task?");
      cy.get('[data-cy="delete-task-modal-yes-btn"]')
        .should("be.visible")
        .and("have.text", "Yes");
      cy.get('[data-cy="delete-task-modal-no-btn"]')
        .should("be.visible")
        .and("have.text", "No")
        .click();
      cy.get('[data-cy="delete-task-modal"]').should("not.exist");
    });
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').should("have.length", numberOfTasks);
    cy.reload();
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-container"]').should("have.length", numberOfTasks);
  });
  it("Should allow delete all task with delete all button", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-panel-delete-all-btn"]').click();
    cy.get('[data-cy="delete-all-task-modal"]').should("be.visible");
    cy.get('[data-cy="delete-all-task-modal-title-label"]')
      .should("be.visible")
      .and("have.text", "Delete Confirmation");
    cy.get('[data-cy="delete-all-task-modal-content-label"]')
      .should("be.visible")
      .and("have.text", "Are you sure to delete all tasks?");
    cy.get('[data-cy="delete-all-task-modal-no-btn"]')
      .should("be.visible")
      .and("have.text", "No");
    cy.get('[data-cy="delete-all-task-modal-yes-btn"]')
      .should("be.visible")
      .and("have.text", "Yes")
      .click();
    cy.get('[data-cy="delete-all-task-modal"]').should("not.exist");
    cy.get('[data-cy="task-container"]').should("not.exist");
    cy.reload();
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-container"]').should("not.exist");
  });
  it("Should allow cancel delete all task with delete all button", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-panel-delete-all-btn"]').click();
    cy.get('[data-cy="delete-all-task-modal"]').should("be.visible");
    cy.get('[data-cy="delete-all-task-modal-title-label"]')
      .should("be.visible")
      .and("have.text", "Delete Confirmation");
    cy.get('[data-cy="delete-all-task-modal-content-label"]')
      .should("be.visible")
      .and("have.text", "Are you sure to delete all tasks?");
    cy.get('[data-cy="delete-all-task-modal-yes-btn"]')
      .should("be.visible")
      .and("have.text", "Yes");
    cy.get('[data-cy="delete-all-task-modal-no-btn"]')
      .should("be.visible")
      .and("have.text", "No")
      .click();
    cy.get('[data-cy="delete-all-task-modal"]').should("not.exist");
    cy.get('[data-cy="task-container"]').should("have.length", numberOfTasks);
    cy.reload();
    cy.get('[data-cy="task-btn"]').click();
    cy.get('[data-cy="task-container"]').should("have.length", numberOfTasks);
  });
  it("Should hide completed task by default", () => {
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element).find('[data-cy="task-checkbox"]').click();
    });
    cy.wait(1000);
    cy.get('[data-cy="task-container"]').should("not.exist");
  });
  it("Should show or hide completed task when toggle", () => {
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element).find('[data-cy="task-checkbox"]').click();
    });
    cy.wait(1000);
    cy.get('[data-cy="task-container"]').should("not.exist");
    cy.get('[data-cy="task-panel-visibility-btn"]').click();
    cy.get('[data-cy="task-container"]')
      .should("have.length", numberOfTasks)
      .each((element) => {
        cy.wrap(element)
          .find('[data-cy="task-title-label"]')
          .should("be.visible")
          .and("have.text", "Demo task")
          .and(
            "have.css",
            "text-decoration",
            "line-through solid rgb(108, 117, 125)"
          );
        cy.wrap(element)
          .find('[data-cy="task-calendar-label"]')
          .should("be.visible")
          .and("have.text", "2023-03-01")
          .and(
            "have.css",
            "text-decoration",
            "line-through solid rgb(108, 117, 125)"
          );
        cy.wrap(element)
          .find('[data-cy="task-time-label"]')
          .should("be.visible")
          .and("have.text", "12:23")
          .and(
            "have.css",
            "text-decoration",
            "line-through solid rgb(108, 117, 125)"
          );
        cy.wrap(element)
          .find('[data-cy="working-pending-badge"]')
          .should("not.exist");
        cy.wrap(element).find('[data-cy="task-checkbox"]').should("be.checked");
      });
    cy.get('[data-cy="task-panel-visibility-btn"]').click();
    cy.get('[data-cy="task-container"]').should("not.exist");
  });
  it("Should display active task when pending badge is clicked", () => {
    cy.get('[data-cy="task-container"]')
      .first()
      .then((element) => {
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
        cy.wrap(element)
          .find('[data-cy="working-pending-badge"]')
          .then((element) => {
            const styles = window.getComputedStyle(element[0], "::after");
            cy.wrap(styles.content).should("equal", '"Working"');
          });
        cy.get('[data-cy="active-task-placeholder"]').should("not.exist");
        cy.get('[data-cy="active-task"]')
          .should("be.visible")
          .and("have.text", "Demo task");
        cy.reload();
        cy.get('[data-cy="active-task"]')
          .should("be.visible")
          .and("have.text", "Demo task");
        cy.title().should("eq", "25:00 | Demo task");
      });
  });
  it("Should only allow one task to be active", () => {
    cy.get('[data-cy="task-container"]')
      .first()
      .then((element) => {
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
      });
    cy.get('[data-cy="task-container"]')
      .last()
      .then((element) => {
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
      });
    cy.get('[data-cy="task-container"]')
      .first()
      .then((element) => {
        cy.wrap(element)
          .find('[data-cy="working-pending-badge"]')
          .then((element) => {
            const styles = window.getComputedStyle(element[0], "::after");
            cy.wrap(styles.content).should("equal", '"Pending"');
          });
      });
  });
  it("Should remove active task once completed", () => {
    cy.get('[data-cy="task-container"]')
      .first()
      .then((element) => {
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
        cy.get('[data-cy="active-task-placeholder"]').should("not.exist");
        cy.get('[data-cy="active-task"]')
          .should("be.visible")
          .and("have.text", "Demo task");
        cy.title().should("eq", "25:00 | Demo task");
        cy.wrap(element).find('[data-cy="task-checkbox"]').click();
        cy.wait(1000);
        cy.get('[data-cy="active-task"]').should("not.exist");
        cy.get('[data-cy="active-task-placeholder"]').should("be.visible");
        cy.title().should("eq", "25:00");
      });
  });
  it("Should remove active task once switched to pending", () => {
    cy.get('[data-cy="task-container"]')
      .first()
      .then((element) => {
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
        cy.get('[data-cy="active-task-placeholder"]').should("not.exist");
        cy.get('[data-cy="active-task"]')
          .should("be.visible")
          .and("have.text", "Demo task");
        cy.title().should("eq", "25:00 | Demo task");
        cy.wrap(element).find('[data-cy="working-pending-badge"]').click();
        cy.wrap(element)
          .find('[data-cy="working-pending-badge"]')
          .then((element) => {
            const styles = window.getComputedStyle(element[0], "::after");
            cy.wrap(styles.content).should("equal", '"Pending"');
          });
        cy.get('[data-cy="active-task"]').should("not.exist");
        cy.get('[data-cy="active-task-placeholder"]').should("be.visible");
        cy.title().should("eq", "25:00");
      });
  });
  it("Should have validation after submitting an edit", () => {
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element).find('[data-cy="edit-task-edit-btn"]').click();
      cy.wrap(element).find('[data-cy="edit-task-title-input"]').clear();
      cy.wrap(element).find('[data-cy="edit-task-submit-btn"]').click();
      cy.wrap(element)
        .find('[data-cy="edit-task-submit-btn"]')
        .should("be.visible");
      cy.wrap(element)
        .find('[data-cy="edit-task-title-invalid-feedback"]')
        .should("be.visible")
        .and(
          "have.text",
          "Please provide a valid name for the task. Max: 40 characters."
        );
      cy.wrap(element).find('[data-cy="edit-task-calendar-input"]').clear();
      cy.wrap(element)
        .find('[data-cy="edit-task-time-input"]')
        .should("be.disabled");
    });
    cy.get('[data-cy="task-panel-edit-btn"]').click();
    cy.get('[data-cy="task-container"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="task-title-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "Demo task");
      cy.wrap(element)
        .find('[data-cy="task-calendar-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "2023-03-01");
      cy.wrap(element)
        .find('[data-cy="task-time-label"]')
        .scrollIntoView()
        .should("be.visible")
        .and("have.text", "12:23");
      cy.wrap(element)
        .find('[data-cy="working-pending-badge"]')
        .scrollIntoView()
        .should("be.visible")
        .then((element) => {
          const styles = window.getComputedStyle(element[0], "::after");
          cy.wrap(styles.content).should("equal", '"Pending"');
        });
      cy.wrap(element).find('[data-cy="task-checkbox"]').should("be.visible");
    });
  });
});
