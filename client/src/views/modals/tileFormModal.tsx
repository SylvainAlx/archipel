import Form from "../../components/form/form";
import Input from "../../components/form/input";
import Button from "../../components/buttons/button";
import TextArea from "../../components/form/textArea";
import { FaCoins } from "react-icons/fa";
import RequiredStar from "../../components/form/requiredStar";
import { TileModel } from "../../models/tileModel";
import { useModal } from "../../hooks/useModal";
import { useTileFormModal } from "../../hooks/modalsHooks/useTileFormModal";

export default function TileFormModal() {
  const {
    handleChange,
    handleSubmit,
    localTile,
    isNewTile,
    tile,
    setTile,
    cost,
    t,
  } = useTileFormModal();
  const modalRef = useModal(() => setTile(new TileModel()));

  return (
    <div ref={modalRef} tabIndex={-1} className="flex flex-col items-center">
      <h2 className="text-2xl text-center p-4">
        {isNewTile
          ? t("components.modals.tileModal.new")
          : t("components.modals.tileModal.update")}
      </h2>
      {!localTile.isFree && (
        <span className="flex items-center gap-1 text-gold">
          <FaCoins />
          {cost && cost}
        </span>
      )}
      <Form
        submit={handleSubmit}
        children={
          <>
            <Input
              required
              type="text"
              name="title"
              value={localTile.title}
              onChange={handleChange}
              placeholder={t("components.modals.tileModal.inputTitle")}
              maxLength={60}
            />
            <TextArea
              name="description"
              placeholder={t("components.modals.tileModal.inputDescription")}
              value={
                localTile.description != undefined ? localTile.description : ""
              }
              onChange={handleChange}
              maxLength={200}
            />
            <Input
              required
              onChange={handleChange}
              type="text"
              name="value"
              placeholder={t("components.modals.tileModal.inputValue")}
              value={localTile.value}
            />
            <RequiredStar />
            <Button
              type="submit"
              text={t("components.buttons.validate")}
              widthFull={true}
              disabled={
                localTile.title === tile.title &&
                localTile.value === tile.value &&
                localTile.description === tile.description
              }
            />
            <Button
              type="button"
              text={t("components.buttons.cancel")}
              click={() => setTile(new TileModel())}
              widthFull={true}
            />
          </>
        }
      />
    </div>
  );
}
