using FormulaOne.ChatService.DataService;
using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;

        public ChatHub(SharedDb sharedDb)
        {
            _shared = sharedDb;
        }
        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All
                          .SendAsync("recivemessage","admin", $"{conn.Username} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
            _shared.Connections[Context.ConnectionId] = conn;
            await Clients.Group(conn.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin",$"{conn.Username} has joined {conn.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("RecieveSpecificMessage", conn.Username, msg);
            }
        }
    }
}
