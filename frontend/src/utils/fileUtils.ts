export const downloadFileFromBytes = (filename: string, bytes: any) => {
    const url = window.URL.createObjectURL(new Blob([bytes]));
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
