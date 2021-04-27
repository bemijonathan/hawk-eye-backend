import chalk from "chalk";

export class Logger  {
    static error(data){
        console.log(chalk.redBright.bold(data));
    }

    static success(data){
        console.log(chalk.blueBright.bold(data));
    }

    static logRequest(req, res, next){
        console.log(chalk.blueBright.bold(JSON.stringify(req.body), JSON.stringify(req.params)))
        next()
    }
}