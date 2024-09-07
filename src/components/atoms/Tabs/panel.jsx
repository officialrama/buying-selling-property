import React from "react";

export default function Panel(props) {
  return <div className={props.className}>{props.children}</div>;
}
