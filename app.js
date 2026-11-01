// AI CỦA HÀO - APP.JS

const input = document.getElementById(“question”);
const messages = document.getElementById(“messages”);
const welcome = document.getElementById(“welcome”);

let chatHistory = [];

function addMessage(text, type) {
const message = document.createElement(“div”);
message.className = “message “ + type;
message.textContent = text;
messages.appendChild(message);
window.scrollTo(0, document.body.scrollHeight);
}

function getAIResponse(question) {
const q = question.toLowerCase().trim();

if (q.includes("xin chào") || q.includes("hello") || q.includes("hi")) {
    return "Xin chào! Tôi là AI CỦA HÀO. Rất vui được trò chuyện với bạn!";
}
if (q.includes("bạn tên gì") || q.includes("tên bạn")) {
    return "Tôi là AI CỦA HÀO, trợ lý AI của bạn!";
}
if (q.includes("bóng đá") || q.includes("football")) {
    return "Bóng đá là môn thể thao tuyệt vời! Bạn muốn tìm hiểu về đội bóng, cầu thủ hay chiến thuật?";
}
if (q.includes("việt nam")) {
    return "Việt Nam có đội tuyển bóng đá quốc gia với biệt danh Những Chiến binh Sao Vàng!";
}
if (q.includes("thủ môn") || q.includes("goalkeeper")) {
    return "Một thủ môn giỏi cần có phản xạ, chọn vị trí, khả năng bắt bóng và giao tiếp tốt!";
}
if (q.includes("mấy giờ")) {
    return "Bạn có thể xem giờ hiện tại trên điện thoại nhé!";
}
if (q.includes("cảm ơn")) {
    return "Không có gì! Tôi luôn sẵn sàng hỗ trợ bạn.";
}
if (q.includes("tạm biệt")) {
    return "Tạm biệt! Hẹn gặp lại bạn trong cuộc trò chuyện tiếp theo.";
}
return "Tôi đã nhận được câu hỏi: \"" + question + "\"\n\nHiện tại tôi đang ở phiên bản thử nghiệm và chưa kết nối mô hình AI trực tuyến. Tôi sẽ được nâng cấp để trả lời thông minh hơn!";

}

function sendMessage() {
const question = input.value.trim();

if (!question) return;
welcome.style.display = "none";
addMessage(question, "user");
chatHistory.push({
    role: "user",
    content: question
});
const answer = getAIResponse(question);
addMessage(answer, "ai");
chatHistory.push({
    role: "assistant",
    content: answer
});
localStorage.setItem(
    "hao_chat_history",
    JSON.stringify(chatHistory)
);
input.value = "";
input.focus();

}

input.addEventListener(“keydown”, function(event) {
if (event.key === “Enter”) {
sendMessage();
}
});

function loadHistory() {
const saved = localStorage.getItem(“hao_chat_history”);

if (!saved) return;
try {
    chatHistory = JSON.parse(saved);
    if (chatHistory.length > 0) {
        welcome.style.display = "none";
        chatHistory.forEach(item => {
            if (item.role === "user") {
                addMessage(item.content, "user");
            } else {
                addMessage(item.content, "ai");
            }
        });
    }
} catch (error) {
    chatHistory = [];
}

}

loadHistory();
