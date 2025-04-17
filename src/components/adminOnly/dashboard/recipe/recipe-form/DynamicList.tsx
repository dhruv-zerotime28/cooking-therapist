import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  label: string;
  items: any[];
  fields: { key: string; placeholder: string }[] | string;
  onChange?: (updated: any[]) => void;
  prefix?: (index: number) => React.ReactNode;
  errors?: string;
};

const DynamicList = ({
  label,
  items,
  fields,
  onChange,
  prefix,
  errors,
}: Props) => {
  const [localItems, setLocalItems] = useState<any[]>(items || []);
  const isSingleField = typeof fields === "string";

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleAdd = () => {
    const newItem = isSingleField ? "" : Object.fromEntries(
      (fields as { key: string }[]).map((f) => [f.key, ""])
    );
    const updated = [...localItems, newItem];
    setLocalItems(updated);
    onChange?.(updated);
  };

  const handleRemove = (index: number) => {
    const updated = localItems.filter((_, i) => i !== index);
    setLocalItems(updated);
    onChange?.(updated);
  };

  const handleUpdate = (
    index: number,
    keyOrValue: string,
    value?: string
  ) => {
    const updated = [...localItems];
    if (isSingleField) {
      updated[index] = keyOrValue;
    } else {
      updated[index][keyOrValue] = value;
    }
    setLocalItems(updated);
    onChange?.(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Label>{label}</Label>
        <Button type="button" variant="outline" onClick={handleAdd}>
          Add {label}
        </Button>
      </div>

      <div className="space-y-3">
        {localItems && localItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {prefix?.(index)}

            {isSingleField ? (
              <Input
                className="flex-1"
                placeholder={`${fields} ${index + 1}`}
                value={item}
                onChange={(e) => handleUpdate(index, e.target.value)}
              />
            ) : (
              (fields as { key: string; placeholder: string }[]).map((field) => (
                <Input
                  key={field.key}
                  className="flex-1"
                  placeholder={field.placeholder}
                  value={item[field.key]}
                  onChange={(e) =>
                    handleUpdate(index, field.key, e.target.value)
                  }
                />
              ))
            )}  
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {errors && <p className="text-destructive text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default DynamicList;
