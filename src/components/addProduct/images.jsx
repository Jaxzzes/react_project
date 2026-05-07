import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import "./add-product-modal.css";

const ItemType = "IMAGE";

const Images = ({ onChange, initialData }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const isInitialized = useRef(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const prepareImages = (images) => {
    return images.map((img) => ({
      ...img,
      id: img.id || uuidv4(),
      preview:
        img.preview && img.preview.startsWith("http")
          ? img.preview
          : img.file
          ? URL.createObjectURL(img.file)
          : null,
    }));
  };

  useEffect(() => {
    if (!isInitialized.current) {
      setUploadedImages(prepareImages(initialData));
      isInitialized.current = true;
    }
  }, [initialData]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    onChange(updatedImages);
  };

  const handleRemoveImage = (imageId) => {
    const updatedImages = uploadedImages.filter((img) => img.id !== imageId);
    setUploadedImages(updatedImages);
    onChange(updatedImages);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = uploadedImages.findIndex((img) => img.id === active.id);
      const newIndex = uploadedImages.findIndex((img) => img.id === over.id);
      const reordered = arrayMove(uploadedImages, oldIndex, newIndex);
      setUploadedImages(reordered);
      onChange(reordered);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  useEffect(() => {
    onChange(uploadedImages);
  }, [uploadedImages]);

  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => {
        if (image.file) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [uploadedImages]);

  return (
    <div className="wrapper-block-tabs">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="block-upload-images">
          <div>
            <FontAwesomeIcon icon={faCloudArrowUp} className="icon-upload" />
          </div>
          <div>Перетащите изображения сюда или нажмите для выбора файлов</div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={uploadedImages.map((img) => img.id)}>
          <div className="image-previews">
            {uploadedImages.map((image, index) => (
              <SortableImage
                key={image.id}
                image={image}
                index={index}
                onRemove={handleRemoveImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableImage = ({ image, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove(image.id);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="image-preview"
      style={style}
    >
      <div {...listeners} class="inner-image-preview">
        <span className="image-number">{index + 1}</span>
        <img src={image.preview} alt="preview" />
      </div>
      <div
        className="image-remove"
        onClick={handleRemoveClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default Images;
