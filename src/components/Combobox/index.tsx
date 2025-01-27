'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

// import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const status = [
  {
    value: 'Approved',
    label: 'Approve',
  },
  {
    value: 'Declined',
    label: 'Decline',
  },
];

const postAction = async (action: string, id: string) => {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/action`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ action:action, id:id }),
    // })
    // if(response.status === 200){
    //   console.log("Action posted successfully");
    // }
  } catch (e) {
    console.error(e);
  }

  console.log(action, id);
};

export function Combobox({
  onChangeFunction,
  id,
}: {
  id: string;
  onChangeFunction: () => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="max-w-24 min-h-fit">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between text-wrap"
        >
          {value
            ? status.find((state) => state.value === value)?.label
            : 'Select Action'}
          <ChevronsUpDown className="ml-1 h-2 w-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          {/* <CommandInput placeholder="test" /> */}
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup className="w-fit">
              {status.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={async (currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    await postAction(currentValue, id);
                    await onChangeFunction();
                  }}
                >
                  {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === state.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                  <Badge
                    variant={
                      state.value as
                        | 'default'
                        | 'secondary'
                        | 'active'
                        | 'pending'
                        | 'inactive'
                        | 'Completed'
                        | 'Sent'
                        | 'Rejected'
                        | 'destructive'
                        | 'outline'
                    }
                  >
                    {state.label}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
