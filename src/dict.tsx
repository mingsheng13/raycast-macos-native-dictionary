import { ActionPanel, Action, Detail, LaunchProps } from "@raycast/api";
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

  const openInApp = (word: string) => {
    spawn("open", [`dict://${word}`]);
  }

  return <Detail 
    markdown={`${output}`} 
    actions={
      <ActionPanel title="hey">
        <Action
          title="Open in Dictionary App"
          onAction={() => openInApp(word)}
        />
      </ActionPanel>
    }
    />;
}
