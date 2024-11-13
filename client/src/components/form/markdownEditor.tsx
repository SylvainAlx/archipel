import MDEditor, { commands, ContextStore } from "@uiw/react-md-editor";
import React from "react";
import { errorMessage } from "../../utils/toasts";
import { useTranslation } from "react-i18next";

interface MarkdownEditorProps {
  value: string;
  onChange:
    | ((
        value?: string,
        event?: React.ChangeEvent<HTMLTextAreaElement>,
        state?: ContextStore,
      ) => void)
    | undefined;
  maxLength?: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  maxLength = 2000,
}: MarkdownEditorProps) {
  const { t } = useTranslation();

  const handleChange = (
    ANewContent?: string,
    AEvent?: React.ChangeEvent<HTMLTextAreaElement>,
    AState?: ContextStore,
  ) => {
    if (ANewContent && ANewContent.length <= maxLength) {
      onChange?.(ANewContent, AEvent, AState);
    } else if (ANewContent && ANewContent.length > maxLength) {
      errorMessage(t("components.form.mdEditor.reached"));
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
      <p>
        {value.length}/
        {`${maxLength} ${t("components.form.mdEditor.character")}`}
      </p>
    </div>
  );
}
