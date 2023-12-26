/* eslint-disable @typescript-eslint/no-explicit-any */
import * as LR from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";
import { useCallback, useEffect, useRef, useState } from "react";

LR.registerBlocks(LR);

export default function Uploader() {
  const dataOutputRef = useRef<LR.DataOutput>();
  const [, setFiles] = useState<any[]>([]);

  const handleUploaderEvent = useCallback((e: CustomEvent<any>) => {
    const { data } = e.detail;
    console.log(data[0].uuid);

    setFiles(data);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    el?.addEventListener(
      "lr-data-output",
      handleUploaderEvent as EventListenerOrEventListenerObject
    );
    return () => {
      el?.removeEventListener(
        "lr-data-output",
        handleUploaderEvent as EventListenerOrEventListenerObject
      );
    };
  }, [handleUploaderEvent]);

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="0782db938d7da0e6c481"
        sourceList="local, url, camera, dropbox"
      ></lr-config>
      <lr-file-uploader-regular ctx-name="my-uploader" css-src={blocksStyles}>
        <lr-data-output
          ctx-name="my-uploader"
          use-event
          hidden
          ref={dataOutputRef}
          onEvent={handleUploaderEvent}
        ></lr-data-output>
      </lr-file-uploader-regular>
    </div>
  );
}
