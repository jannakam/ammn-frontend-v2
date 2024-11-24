import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import Image from 'next/image';
export default function AutoFormFile({ label, isRequired, fieldConfigItem, fieldProps, field }) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      setFileName(file.name);
      field.onChange(file);
    }
  };

  const handleRemoveClick = () => {
    setFile(null);
  };

  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={fieldConfigItem?.label || label} isRequired={isRequired} />}
      {!file && (
        <FormControl>
          <Input type='file' {...fieldPropsWithoutShowLabel} onChange={handleFileChange} value={''} />
        </FormControl>
      )}
      {file && (
        <div className='flex h-[40px] w-full flex-row items-center justify-start space-x-2 rounded-md border bg-muted/[.3] p-2 text-foreground focus-visible:ring-0 focus-visible:ring-offset-0'>
          <Image
            src={URL.createObjectURL(file)}
            alt='preview'
            className='h-8 w-8 rounded-sm object-cover'
            width={32}
            height={32}
          />
          <p className='flex-1'>{fileName}</p>
          <button onClick={handleRemoveClick} aria-label='Remove image'>
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
