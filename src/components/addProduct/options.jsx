import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import "./add-product-modal.css";

const Options = ({ onChange, initialData }) => {
  const [options, setOptions] = useState(() =>
    (initialData || []).map((opt, idx) => ({
      id: opt.id || uuidv4(),
      name: opt.name || "",
      description: opt.description || "",
      index: idx + 1,
    }))
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const addOption = () => {
    setOptions((prev) => [
      ...prev,
      { id: uuidv4(), name: "", description: "", index: prev.length + 1 },
    ]);
  };

  const removeOption = (id) => {
    setOptions((prev) => {
      const filteredOptions = prev.filter((option) => option.id !== id);
      return filteredOptions.map((option, idx) => ({
        ...option,
        index: idx + 1,
      }));
    });
  };

  const updateOption = (id, field, value) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOptions((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);
        return reordered.map((opt, idx) => ({
          ...opt,
          index: idx + 1,
        }));
      });
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(options);
    }
  }, [options]);

  return (
    <div className="wrapper-block-tabs">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={options.map((opt) => opt.id)}>
          <div className="options-list">
            {options.map((option) => (
              <SortableOption
                key={option.id}
                option={option}
                updateOption={updateOption}
                removeOption={removeOption}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button className="add-option-button" onClick={addOption}>
        Add Option
      </button>
    </div>
  );
};

const SortableOption = ({ option, updateOption, removeOption }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeOption(option.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`option-block ${isDragging ? "dragging" : ""}`}
      {...attributes}
    >
      <div className="option-top-block" {...listeners}>
        <div className="option-index-block">
          <div>{option.index}</div>
        </div>
        <div>&nbsp;</div>
      </div>

      <div className="option-remove-button">
        <button
          className="remove-option-button"
          onClick={handleRemoveClick}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="option-title-block">
        <div>Title</div>
        <input
          type="text"
          value={option.name}
          onChange={(e) => updateOption(option.id, "name", e.target.value)}
          className="option-title-textfield"
        />
      </div>

      <div className="option-description-block">
        <div>Description</div>
        <textarea
          value={option.description}
          onChange={(e) =>
            updateOption(option.id, "description", e.target.value)
          }
          className="product-modal-textarea options-textarea"
        />
      </div>
    </div>
  );
};

export default Options;
