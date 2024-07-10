// @ts-nocheck

import { useState } from "react";
import { Descendant } from "slate";

export default function useEditorValue(initialValue = "") {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: initialValue,
      children: [{ text: "" }],
    },
  ]);

  return { value, setValue };
}
