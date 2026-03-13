type UploadFileParams = {
  signal: AbortSignal;
  file: File;
  onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
};

export async function fileUpload({
  file,
  signal,
  onprogress,
}: UploadFileParams) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const abortRequest = () => xhr.abort();

    xhr.upload.onprogress = (event) => onprogress.call(xhr, event);

    xhr.onloadend = () => signal.removeEventListener("abort", abortRequest);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300)
        return resolve(new Response(xhr.responseText, { status: xhr.status }));
      reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    signal.addEventListener("abort", abortRequest);

    xhr.open("POST", "http://localhost:4000/upload");
    xhr.send(formData);
  });

  return (await response.json()) as { file: { url: string }; message: string };
}
