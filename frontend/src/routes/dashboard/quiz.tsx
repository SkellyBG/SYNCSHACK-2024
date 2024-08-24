import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/dashboard/quiz')({
  component: Quiz
})

const universities = [
  {
    value: "uts",
    label: "UTS",
  },
  {
    value: "unsw",
    label: "UNSW",
  },
  {
    value: "usyd",
    label: "USYD",
  },
]

const degrees = [
  {
    value: "computer-science",
    label: "Computer Science",
  },
  {
    value: "software-engineering",
    label: "Software Engineering",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
]

function Quiz() {
  const [universityOpen, setUniversityOpen] = useState(false)
  const [universityValue, setUniversityValue] = useState("")

  const [degreeOpen, setDegreeOpen] = useState(false)
  const [degreeValue, setDegreeValue] = useState("")

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gray-100">
      <h1>Let's finalize your profile!</h1>
      <Card className="w-full max-w-md">
        <CardContent className="pt-5">
        
        <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={universityOpen}
              className="w-[200px] justify-between"
            >
              {universityValue
                ? universities.find((university) => university.value === universityValue)?.label
                : "Select framework..."}
              <RiExpandUpDownLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search university..." />
              <CommandList>
                <CommandEmpty>No university found.</CommandEmpty>
                <CommandGroup>
                  {universities.map((university) => (
                    <CommandItem
                      key={university.value}
                      value={university.value}
                      onSelect={(currentValue) => {
                        setUniversityValue(currentValue === universityValue ? "" : currentValue)
                        setUniversityOpen(false)
                      }}
                    >
                      <FaCheck
                        className={cn(
                          "mr-2 h-4 w-4",
                          universityValue === university.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {university.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={degreeOpen} onOpenChange={setDegreeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={degreeOpen}
              className="w-[200px] justify-between"
            >
              {degreeValue
                ? degrees.find((degree) => degree.value === degreeValue)?.label
                : "Select framework..."}
              <RiExpandUpDownLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setDegreeValue(currentValue === degreeValue ? "" : currentValue)
                        setDegreeOpen(false)
                      }}
                    >
                      <FaCheckkkkm
                        className={cn(
                          "mr-2 h-4 w-4",
                          degreeValue === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      
        </CardContent>
      </Card>
    </div>
  )
}