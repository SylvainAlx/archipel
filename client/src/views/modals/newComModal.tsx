import Button from "../../components/buttons/button";
import Form from "../../components/form/form";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import { MAX_LENGTH } from "../../settings/consts";
import { emptyComPayload } from "../../types/typCom";
import MarkdownEditor from "../../components/form/markdownEditor";
import { nationComTypeOptions } from "../../settings/lists";
import RequiredStar from "../../components/form/requiredStar";
import { useModal } from "../../hooks/useModal";
import { useNewComModal } from "../../hooks/modalsHooks/useNewComModal";

export default function NewComModal() {
  const {
    newCom,
    setNewCom,
    handleSubmit,
    handleChange,
    handleSelectChange,
    t,
  } = useNewComModal();
  const modalRef = useModal(() => setNewCom(emptyComPayload));

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="max-w-[600px] flex flex-col justify-center items-center gap-2"
    >
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.newComModal.title")}
      </h2>
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="title"
              value={newCom.title}
              onChange={handleChange}
              placeholder={t("components.modals.newComModal.comTitle")}
            />
            <Select
              options={nationComTypeOptions}
              onChange={handleSelectChange}
              value={newCom.comType}
            />
            <MarkdownEditor
              value={newCom.message}
              onChange={(value) =>
                value != undefined && setNewCom({ ...newCom, message: value })
              }
              maxLength={MAX_LENGTH.text.comMessage}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={
                newCom.title === "" ||
                newCom.message.length === 0 ||
                newCom.message.length > MAX_LENGTH.text.comMessage
              }
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setNewCom(emptyComPayload)}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
