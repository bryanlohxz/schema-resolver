import { input } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs";
import yaml, { YAMLException } from "js-yaml";

const promptForPath = () =>
  input({ message: "Enter the path to your schema..." });

const compareCollection = (a, b) => {
  return a.collection.localeCompare(b.collection);
};

const compareFields = (a, b) => {
  const collection = compareCollection(a, b);
  if (collection !== 0) return collection;
  return a.field.localeCompare(b.field);
};

const compareRelations = (a, b) => {
  const field = compareFields(a, b);
  if (field !== 0) return field;
  return a.related_collection.localeCompare(b.related_collection);
};

export const showSortSchema = async () => {
  try {
    console.clear();

    let pathToSchema = await promptForPath();
    while (!fs.existsSync(pathToSchema) || !pathToSchema.endsWith(".yml")) {
      console.log(chalk.red("YML does not exist. Please try again..."));
      pathToSchema = await promptForPath();
    }

    console.log(chalk.blue(`Reading ${pathToSchema}...`));
    const file = fs.readFileSync(pathToSchema);
    console.log(chalk.blue(`Parsing ${pathToSchema}...`));
    const schema = await yaml.load(file.toString(), { filename: pathToSchema });
    console.log(chalk.blue(`Sorting ${pathToSchema}...`));
    schema.collections = schema.collections.sort(compareCollection);
    schema.fields = schema.fields.sort(compareFields);
    schema.relations = schema.relations.sort(compareRelations);
    console.log(chalk.blue(`Writing back to ${pathToSchema}...`));
    const output = yaml.dump(schema, { forceQuotes: false, quotingType: "'" });
    fs.writeFileSync(pathToSchema, output);
    console.log(chalk.blue(`Completed.`));
  } catch (thrown) {
    if (thrown instanceof YAMLException)
      return console.log(chalk.red(thrown.message));
    console.error(thrown);
    process.exit(1);
  }
};
