import MDEditor, { commands, ContextStore } from "@uiw/react-md-editor";

interface MarkdownEditorProps {
  value: string;
  onChange:
    | ((
        value?: string,
        event?: React.ChangeEvent<HTMLTextAreaElement>,
        state?: ContextStore,
      ) => void)
    | undefined;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <MDEditor
      value={value}
      onChange={onChange}
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
  );
}
