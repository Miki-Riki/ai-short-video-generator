import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


function SelectTopic({ onUserSelect }) {
    const options = ['Custom Prompt', 'Random Story', 'Scary', 'For Kids', 'Science', 'History', 'Lifestyle']
    const [selectedOption, setSelectedOption] = useState(''); // Initialize with a default value (e.g., an empty string)

    return (
        <div>
            <h2 className='font-bold text-xl text-primary'>Content</h2>
            <p className='text-gray-500'>What is the topic of your video?</p>
            <Select onValueChange={(value) => {
                setSelectedOption(value)
                value !== 'Custom Prompt' && onUserSelect('topic', value) // Use strict equality (!==)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem> // Add a key to each SelectItem
                    ))}
                </SelectContent>
            </Select>

            {selectedOption === 'Custom Prompt' && (
                <Textarea
                    className="mt-3"
                    onChange={(e) => onUserSelect('topic', e.target.value)}
                    placeholder="Write a prompt on which you want to generate video"
                />
            )}
        </div>
    )
}

export default SelectTopic
