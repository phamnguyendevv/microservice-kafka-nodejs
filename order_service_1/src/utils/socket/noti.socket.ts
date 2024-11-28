import { Server } from "socket.io";

let ioInstance: Server | null = null;
const onlineUsers = new Map();

const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Đảm bảo rằng đây là domain của bạn
    },
  });
  ioInstance = io; // Lưu lại instance

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("user:login", (data) => {
      console.log(data);
      // Ví dụ: { userId: "12345", socketId: "abcde12345" }

      // Lưu thông tin kết nối nếu cần
      // users[data.userId] = socket.id;

      // Có thể phản hồi lại client nếu cần
      socket.emit("login:success", { message: "Đăng nhập thành công!" });
    });

    // Khi user gửi tin nhắn
    socket.on("send-msg", (data) => {
      const { to, message } = data; // "to" là userId của người nhận
      const receiverSocketId = onlineUsers.get(to);

      if (receiverSocketId) {
        // Gửi tin nhắn đến socket của người nhận
        io.to(receiverSocketId).emit("msg-receive", {
          from: socket.id,
          message,
        });
      } else {
        console.log(`User ${to} is not online.`);
      }
    });

    // Khi admin gửi thông báo đến tất cả người dùng
    socket.on("send-to-all", (message) => {
      console.log("Admin is sending a message to all users:", message);

      // Gửi thông báo đến tất cả client
      io.emit("notification", {
        from: "admin",
        message,
      });
    });
    // Khi user ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Xóa user khỏi danh sách online
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`Removed ${userId} from online users.`);
          break;
        }
      }
    });
  });

  return io;
};

export const getSocketInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO instance has not been initialized.");
  }
  return ioInstance;
};

export default setupSocket;
