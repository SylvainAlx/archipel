import MDEditor, { commands, ContextStore } from "@uiw/react-md-editor";
import React from "react";
import { useTranslation } from "react-i18next";
import { errorMessage } from "../../utils/toasts";
import { MAX_LENGTH } from "../../settings/consts";

interface MarkdownEditorProps {
  value: string;
  onChange: (
    value?: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>,
    state?: ContextStore,
  ) => void;
  maxLength: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  maxLength = MAX_LENGTH.text.defaultMD,
}: MarkdownEditorProps) {
  const { t } = useTranslation();

  const handleChange = (newValue: string | undefined) => {
    if (newValue != undefined) {
      if (value.length >= maxLength && newValue.length > value.length) {
        errorMessage(t("components.form.mdEditor.reached"));
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <div>
      <MDEditor
        value={value}
        onChange={handleChange}
        commands={[
          commands.bold,
          commands.italic,
          commands.hr,
          commands.title2,
          commands.title3,
          commands.link,
          commands.quote,
          commands.table,
          commands.comment,
          commands.help,
        ]}
      />
      <p className={`${value.length > maxLength && "text-danger"}`}>
        {value.length}/
        {`${maxLength} ${t("components.form.mdEditor.character")}`}
      </p>
    </div>
  );
}
