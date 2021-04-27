import chalk from "chalk";

export class Logger  {
    static error(data){
        console.log(chalk.redBright.bold(data));
    }

    static success(data){
        console.log(chalk.blueBright.bold(data));
    }
}