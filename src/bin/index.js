#! /usr/bin/env node

import path from "path";
import fs from "fs-extra";
import { program } from "commander";
import inquirer from "inquirer";
import download from "download-git-repo";

program.version("0.0.1", "-v, --version", "定义脚手架版本号");

program.command("create <name>").action((name) => {
  const downloadPath = path.join(process.cwd(), name);
  inquirer.prompt([
    {
      name: "author",
      message: "作者名字: ",
    },
    {
      name: "version",
      message: "版本号: ",
      default: "0.0.1",
    },
    {
      name: "description",
      message: "工程描述: ",
    }
]).then((res) => {
    const { author, version, description } = res;
    const mergeObj = {
      author,
      name,
      version,
      description,
    };
    download("direct:https://gitee.com/luocheng-fu/view-mobile.git", downloadPath, { clone: true }, (err) => {
      if (!err) {
        const packagePath = path.join(downloadPath, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packagePath).toString());
        fs.writeFileSync(
          packagePath,
          JSON.stringify(packageJson, (k, v) => mergeObj[k] || v, "\t")
        );
         // 下载成功
      } else {
        // 下载失败
      }
    });
  });
});

program.parse(process.argv);

