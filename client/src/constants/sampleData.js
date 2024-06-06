export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
    name: "John Doe 2",
    _id: "2",
    groupChat: false,
    members: ["1", "2", "3"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
    name: "John Doe 2",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "John Doe 2",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "NKN VSIDVJID VSDNVSL",
    _id: "sncnklnvienjvoe",
    sender: {
      _id: "user._id",
      name: "John",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "efkbefjk 2",
        url: "https://www.w3schools.com/howto/img_avatar2.png",
      },
    ],
    content: "",
    _id: "sncnklnvibfenjvoe",
    sender: {
      _id: "qwerty",
      name: "John 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "John Doe",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "John Doe 2",
      _id: "2",
      username: "john_the_doe",
      friends: 29,
      groups: 6,
    },
  ],
  chats: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "Shivani Group",
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
        {
          _id: "2",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
        {
          _id: "3",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
        {
          _id: "4",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
      ],
      totalMembers: 4,
      totalMessages: 304,
      creator: {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "John",
      },
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "Mahima Group",
      _id: "2",
      groupChat: true,
      members: [
        {
          _id: "2",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
        {
          _id: "3",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
        {
          _id: "4",
          avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        },
      ],
      totalMembers: 3,
      totalMessages: 2948,
      creator: {
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
        name: "Cena",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "NKN VSIDVJID VSDNVSL",
      _id: "sncnklnvienjvoe",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        name: "John",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "efkbefjk 2",
          url: "https://www.w3schools.com/howto/img_avatar2.png",
        },
      ],
      content: "",
      _id: "sncnklnvibfenjvoe",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        name: "John 2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};
