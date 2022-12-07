declare var lisp: any;

function chatworkSelectRoom() {
  const rooms: string[] = ["a", "b", "c"];
  const room = lisp.completing_read("Room: ", lisp.make.list(rooms));
  return room;
}

lisp.defun({
  name: "chatwork-send-message-ng",
  interactive: true,
  args: "sMessage: ",
  func: (message: string) => {
    const val = chatworkSelectRoom();
    lisp.print(val);
  },
});
