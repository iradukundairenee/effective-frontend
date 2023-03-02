import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStyles } from "./styles";

export const DraftEditor = ({
  setEditorState,
  editorState,
  menuHidden,
  placeholder,
}) => {
  const classes = useStyles();

  return (
    <Editor
      editorClassName={classes.editor}
      editorState={editorState}
      placeholder={placeholder}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: [
          "history",
          "fontFamily",
          "blockType",
          "fontSize",
          "inline",
          "textAlign",
          "list",
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
      }}
      toolbarClassName={menuHidden ? classes.toolbarHidden : classes.toolbar}
      wrapperClassName={classes.root}
    />
  );
};
