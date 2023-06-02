import React from "react";

export default function Imagegrid({}) {
    const [images, setImages] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImages((prevState) => [
                    ...prevState,
                    {id: cuid(), src: e.target.result},
                ]);
            };

            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    return (
        <main className="App">
            <h1 className="text-center">Drag and Drop Test</h1>
            <Dropzone onDrop={onDrop} accept={"image/*"}/>
            <ImageGrid images={images}/>
        </main>
    );
}
