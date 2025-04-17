'use client';

import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { X, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Controller, Control } from 'react-hook-form';

interface MediaUploaderProps {
  control: Control<any>;
  name?: string; // Optional if you want to customize field name
  errors : any;
  
}

export default function MediaUploader({
  control,
  errors,
  name = '',
}: MediaUploaderProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState }) => {
        const { onChange, value } = field;

        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            const newFiles = [...value, ...acceptedFiles];
            onChange(newFiles);
          },
          [value, onChange]
        );

        const removeImage = (index: number) => {
          const updated = [...value];
          updated.splice(index, 1);
          onChange(updated);
        };

        const { getRootProps, getInputProps } = useDropzone({
          accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
          },
          onDrop,
        });

        return (
          <div>
            <Label>Recipe Images</Label>
            <div className="mt-2">
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Drag & drop images here, or click to select files
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-2">
                  {fieldState.error.message}
                </p>
              )}
            </div>

            {value.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {value.map((file: File | string, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={
                        typeof file === 'string'
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt={`Recipe image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-background/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
