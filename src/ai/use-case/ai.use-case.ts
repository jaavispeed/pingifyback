import OpenAI from "openai";

interface Options {

    prompt: string;

}


export const aiCheckUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [{
            role: 'system',
            content: "Eres un asistente que mejora mensajes de correos para que suenen profesionales y claros."
        },
        {
            role: 'user',
            content: prompt,
        }
    ],
        model: 'gpt-3.5-turbo',
    })
    return completion.choices[0]

}