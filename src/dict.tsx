import { Detail, LaunchProps } from "@raycast/api";
import { spawn } from "child_process";
import { useState, useEffect } from "react";

export default function Command(props: LaunchProps<{ arguments: Arguments.Dict }>) {
  const { word } = props.arguments;
  const [output, setOutput] = useState("Loading...");

  useEffect(() => {
    const process = spawn("./dict", [word], {
      cwd: "/Users/mingsheng/projects/dict/search-your-dict/",
    });

    let collectedOutput = "";

    process.stdout.on("data", (data) => {
      collectedOutput += data.toString();
    });

    process.stderr.on("data", (data) => {
      collectedOutput += `Error: ${data.toString()}`;
    });

    process.on("close", () => {
      setOutput(collectedOutput || "No output");
    });
  }, []);

  return <Detail markdown={`${output}`}/>;
}
