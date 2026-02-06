import  { useState } from 'react'
import { useSendMessageMutation } from '../store/api/endpoints/chatApi'
const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "I’m a friendly AI assistant built for the Lagos State Basketball Community. I help with club registrations, team assignments, and any general basketball‑related questions you might have.", sender: 'bot' }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const [sendMessageMutation] = useSendMessageMutation();

    const formatBotResponse = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/&amp;/g, '&')
            .replace(/‑/g, '-')
            .replace(/–/g, '-')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n')
    }



    const sendMessage = async () => {
        if (inputValue.trim()) {
            // Add user message immediately
            const userMessage = { id: Date.now(), text: inputValue, sender: 'user' }
            setMessages(prev => [...prev, userMessage])
            
            const currentInput = inputValue
            setInputValue('')
            setIsLoading(true)
            
            try {
                const response = await sendMessageMutation({ text: currentInput })
                
                // Add bot response
                if (response.data) {
                    const formattedText = formatBotResponse(response.data.response)
                    const botMessage = { id: Date.now() + 1, text: formattedText, sender: 'bot' }
                    setMessages(prev => [...prev, botMessage])
                }
            } catch (error) {
                const errorMessage = { id: Date.now() + 1, text: "Sorry, I'm having trouble responding right now.", sender: 'bot' }
                setMessages(prev => [...prev, errorMessage])
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='absolute right-10 bg-white h-[400px] w-[350px] rounded-lg bottom-20 shadow-lg border flex flex-col'>
            <div className='bg-[#FF6B35] text-white p-3 rounded-t-lg font-semibold'>
                LSBC BOT
            </div>

            <div className='flex-1 p-3 overflow-y-auto space-y-2'>
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start '} `}>
                        <div className='flex flex-col'>
                            <div className={`max-w-[100%] p-2 rounded-lg text-sm ${message.sender === 'user'
                                ? 'bg-[#FF6B35] text-white'
                                : 'bg-gray-100 text-gray-800'
                                } `}
                                dangerouslySetInnerHTML={{ __html: message.text }}
                            />
                            <p className='text-sm text-gray-400'>
                                {message.sender}
                            </p>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className='flex justify-start'>
                        <div className='flex flex-col'>
                            <div className='bg-gray-100 text-gray-800 p-2 rounded-lg text-sm'>
                                <div className='flex items-center space-x-1'>
                                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                            <p className='text-sm text-gray-400'>bot</p>
                        </div>
                    </div>
                )}
            </div>

            <div className='p-3 border-t flex gap-2'>
                <input
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder='Type a message...'
                    className='flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]'
                />
                <button
                    onClick={sendMessage}
                    className='bg-[#FF6B35] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#e55a2b]'
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chatbot