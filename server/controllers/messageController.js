import imageKit from "../configs/imageKit.js"
import openai from "../configs/openai.js"
import Chat from "../models/Chat.js"
import User from "../models/User.js"

// API to Generate Text Response
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id

    // Check for credits
    if (req.user.credits < 1) {
      return res.json({ success: false, message: "You don't have enough credits to use this feature." })
    }

    const { chatId, prompt } = req.body

    // Find Chat
    const chat = await Chat.findOne({ userId, _id: chatId })
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false
    })

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const reply = {...choices[0].message,   timestamp: Date.now(), isImage: false }
    res.json({ success: true, reply })

    chat.messages.push(reply)
    await chat.save()
    await User.updateOne({_id: userId}, {$inc: {credits: -1}})

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
};

// API to Generate Image Response
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        //Check for credits
        if (req.user.credits < 2) {
            return res.json({success: false, message: "You don't have enough credits to use this feature."})
        }
        const { chatId, prompt, isPublished } = req.body
        // Find Chat
        const chat = await Chat.findOne({userId, _id: chatId})

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const encodedPrompt = encodeURIComponent(prompt)

        const aiGeneratedImageUrl = 
        `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`

        const uploadResponse = await imageKit.files.upload({
            file: await fetch(aiGeneratedImageUrl),
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        })

        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id: userId}, {$inc: {credits: -2}})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
