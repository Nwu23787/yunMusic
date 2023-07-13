import request from "@/utils/chatRequest.js"


export const responseWords = () => request({
    url: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Authorization': '请使用你的chatgpt token',
        'Content-Type': 'application/json'
    },
    data: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "message": [{
            "role": "user",
            "content": "你好"
        }]
    })
})