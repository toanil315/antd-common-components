import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { cn } from '@/utils/shadcn.util';
import { Button } from '@/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { FilterIcon } from 'lucide-react';
import { CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  options?: { value: string; label: string; icon?: React.ElementType }[];
}

function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
  options,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const renderSortDropdown = () => {
    if (!column.getCanSort()) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='h-5 px-1 data-[state=open]:bg-accent'
          >
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='h-4 w-4' />
            ) : (
              <CaretSortIcon className='h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <CaretSortIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            UnSort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderFilterDropdown = () => {
    if (!column.getCanFilter()) return null;
    if (!options || !Array.isArray(options)) return null;

    const selectedValues = new Set(column?.getFilterValue() as string[]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='h-8 border-none bg-transparent'
          >
            <FilterIcon
              className={cn('h-4 w-4', {
                'stroke-blue-500': selectedValues.size > 0,
              })}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[200px] p-0'
          align='end'
        >
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value);
                        } else {
                          selectedValues.add(option.value);
                        }
                        const filterValues = Array.from(selectedValues);
                        column?.setFilterValue(filterValues.length ? filterValues : undefined);
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className='justify-center text-center'
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={cn('flex items-center justify-between space-x-2', className)}>
      <span>{title}</span>
      <div className='flex flex-row flex-nowrap items-center'>
        {renderSortDropdown()}
        {renderFilterDropdown()}
      </div>
    </div>
  );
}

export default ColumnHeader;
