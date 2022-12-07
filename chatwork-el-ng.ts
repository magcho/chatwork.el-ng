import { get, post } from "./api.ts";

declare var lisp: any;
type Room = {
  name: string;
  id: number;
};
type Rooms = Room[];

const API_BASE_URL = "https://api.chatwork.com/v2";

function chatworkSelectRoom(rooms: Rooms) {
  const selectedRoomName = lisp.completing_read(
    "Room: ",
    lisp.make.list(rooms.map((r) => r.name)),
  );
  const selectedRoom = rooms.find((r) => r.name === selectedRoomName);

  if (!selectedRoom) {
    throw new Error();
  }
  return selectedRoom.id;
}

async function chatworkPostMessage(
  message: string,
  roomId: number,
): Promise<void> {
  const url = `${API_BASE_URL}/rooms/${roomId}/messages`;
  const apiToken = lisp.eval(lisp.symbols["chatwork-ng-token"]) as string;
  const data = {
    body: message,
    self_unread: "0",
  };

  await post(url, apiToken, data);
}

async function chatworkGetRooms() {
  const url = `${API_BASE_URL}/rooms`;
  const apiToken = lisp.eval(lisp.symbols["chatwork-ng-token"]) as string;
  const res = await get(url, apiToken);
  const roomsResponse = await res.json();

  const rooms: Rooms = roomsResponse.map((roomResponse: any) => ({
    name: roomResponse["name"],
    id: roomResponse["room_id"],
  }));

  return rooms;
}

lisp.defvar(lisp.symbols["chatwork-ng-token"], "ChatWork API Token.");

lisp.defun({
  name: "chatwork-ng-send-message",
  interactive: true,
  args: "sMessage: ",
  func: async (message: string) => {
    const rooms = await chatworkGetRooms();
    const selectRoomId = chatworkSelectRoom(rooms);

    await chatworkPostMessage(message, selectRoomId);
  },
});
