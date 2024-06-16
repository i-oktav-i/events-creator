export const saveToFile = (
  data: string,
  filename: string,
  type: string = "text/plain"
) => {
  const blob = new Blob([data], { type });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const loadFromFile = async (accept = "text/plain") => {
  const { promise, resolve, reject } = Promise.withResolvers<
    string | ArrayBuffer
  >();

  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;

  input.onchange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const result = e.target?.result;

          if (!result) throw new Error("Nothing read");

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsText(file);
    }
  };

  input.click();

  return promise;
};
