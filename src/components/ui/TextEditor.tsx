// @ts-nocheck
import React, {
  useCallback,
  useMemo,
  ReactNode,
  Ref,
  PropsWithChildren,
} from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";

import ReactDOM from "react-dom";
import { cx, css } from "@emotion/css";
import { BoldIcon } from "../icons/BoldIcon";
import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  ListIcon,
  NumberListIcon,
  UnderlineIcon,
} from "../icons";
import { BlockQuotesIcon } from "../icons/BlockQuotesIcon";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed: _reserved,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      ref={ref}
      className={`${
        active
          ? "bg-primary text-white"
          : "text-gray-400 hover:text-white hover:bg-primary"
      } ${className}`}
    />
  ),
);

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any;
      } & BaseProps
    >,
    ref: Ref<OrNull<null>>,
  ) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join("\n");
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `,
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate's value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    );
  },
);

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => {
    // <MarkButton format="bold" icon="format_bold" />
    // <MarkButton format="italic" icon="format_italic" />
    // <MarkButton format="underline" icon="format_underlined" />
    // <MarkButton format="code" icon="code" />
    // <BlockButton format="heading-one" icon="looks_one" />
    // <BlockButton format="heading-two" icon="looks_two" />
    // <BlockButton format="block-quote" icon="format_quote" />
    // <BlockButton format="numbered-list" icon="format_list_numbered" />
    // <BlockButton format="bulleted-list" icon="format_list_bulleted" />
    // <BlockButton format="left" icon="format_align_left" />
    // <BlockButton format="center" icon="format_align_center" />
    // <BlockButton format="right" icon="format_align_right" />
    // <BlockButton format="justify" icon="format_align_justify" />
    if (props.children === "format_align_justify") return null;
    if (props.children === "format_align_left") return null;
    if (props.children === "format_align_center") return null;
    if (props.children === "format_align_right") return null;

    return (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            font-size: 18px;
            vertical-align: text-bottom;
            width: 1em;
            height: 1em;
            display: flex;
            align-items: center;
            justify-content: center;
          `,
        )}
      >
        {props.children === "format_bold" && <BoldIcon />}
        {props.children === "format_italic" && <ItalicIcon />}
        {props.children === "format_underlined" && <UnderlineIcon />}
        {props.children === "code" && <CodeIcon />}
        {props.children === "looks_one" && (
          <Heading1Icon width={16} height={16} />
        )}
        {props.children === "looks_two" && (
          <Heading2Icon width={16} height={16} />
        )}
        {props.children === "format_quote" && <BlockQuotesIcon />}
        {props.children === "format_list_bulleted" && <ListIcon />}
        {props.children === "format_list_numbered" && <NumberListIcon />}
      </span>
    );
  },
);

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `,
      )}
    />
  ),
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 auto;
        `,
      )}
    />
  ),
);

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// @ts-ignore
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          className="border-l-4 border-primary pl-2 text-gray-300 text-sm"
          style={style}
          {...attributes}
        >
          ӏӏ {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc pl-4" style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <span
          className={`p-0 m-0 text-3xl text-white font-pregular ${
            style.textAlign ? `text-${style.textAlign}` : ""
          }`}
          style={style}
          {...attributes}
        >
          {children}
        </span>
      );
    case "heading-two":
      return (
        <span
          className={`p-0 m-0 text-xl text-white font-pregular  ${
            style.textAlign ? `text-${style.textAlign}` : ""
          }`}
          style={style}
          {...attributes}
        >
          {children}
        </span>
      );
    case "list-item":
      return (
        <li className="list-inside pl-2 text-sm" style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        // numered list
        <ol className="list-decimal pl-4" style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <span
          className={`p-0 m-0 text-sm text-white font-pregular  ${
            style.textAlign ? `text-${style.textAlign}` : ""
          }`}
          style={style}
          {...attributes}
        >
          {children}
        </span>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <span className="font-pbold">{children}</span>;
  }

  if (leaf.code) {
    children = (
      <code className="bg-gray-800 rounded-xl text-sm px-2 text-[#d0e0e0]">
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MyTextEditor = ({
  initialValue,
  setValue,
}: {
  initialValue: Descendant[];
  setValue: (value) => void;
}) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="flex flex-col gap-5 text-white h-[510px]">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          setValue(value);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck={false}
          autoFocus
          className="outline-none overflow-auto overflow-x-hidden"
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export { MyTextEditor };
