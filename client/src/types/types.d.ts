interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

enum Status {
  started,
  progress,
  done,
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  client: Client;
}
