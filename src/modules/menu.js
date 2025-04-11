import { showSortSchema } from "./sort.js";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";

const title = chalk.blue(
  figlet.textSync("Bryan's Schema Resolver", {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default",
  })
);

export const showMainMenu = async () => {
  console.clear();
  console.log(title + "\n");
  console.log(chalk.green("Welcome!"));
  console.log(chalk.yellow("What would you like to do today?\n"));

  const { menuChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "Choose an option:",
      choices: ["Resolve Schema Differences", "Sort Schema", "Exit"],
    },
  ]);

  await handleMenuChoice(menuChoice);
};

const handleMenuChoice = async (choice) => {
  switch (choice) {
    case "Resolve Schema Differences":
      console.log(chalk.cyan("Resolving schema differences..."));
      break;
    case "Sort Schema":
      await showSortSchema();
      break;
    case "Exit":
      console.log(chalk.red("Goodbye!"));
      process.exit(0);
    default:
      console.error(chalk.red("Unknown option!"));
      break;
  }

  const prompt = chalk.blue("Go back to the main menu?");
  const answer = await confirm({ message: prompt });
  if (answer) return showMainMenu();
  process.exit(0);
};
