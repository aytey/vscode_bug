import * as vscode from "vscode";

let globalController: vscode.TestController;
let flag = false;

/* hard-coded to false to demonstrate the bug */
const alwaysChildren = false;

function loadAllTests(controller: vscode.TestController) {
  const envNode = controller.createTestItem("ENV", "ENV");

  const unitNode = controller.createTestItem("UNIT", "UNIT");

  const subNode = controller.createTestItem("SUB", "SUB");

  /*
   * If you have this, things works.
   * That is: if we have one sibling, the update works.
   * If you have no siblings, the update **does not** work
   */
  if (alwaysChildren) {
    const testNode0 = controller.createTestItem("TEST0", "TEST0");
    subNode.children.add(testNode0);
  }

  /* if flag is true, add tests */
  if (flag) {
    const testNode1 = controller.createTestItem("TEST1", "TEST1");
    subNode.children.add(testNode1);
    console.log("Added one test");
  } else {
    console.log("Added no tests");
  }
  unitNode.children.add(subNode);
  envNode.children.add(unitNode);
  controller.items.add(envNode);

  /* flip flag */
  flag = flag ? false : true;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.addTests",
    () => {
      loadAllTests(globalController);
    },
  );
  context.subscriptions.push(disposable);

  globalController = vscode.tests.createTestController(
    "test-controller",
    "Tests",
  );
  context.subscriptions.push(globalController);
}
